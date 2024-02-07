use std::rc::Rc;

use actix_web::web;

use futures_util::future::LocalBoxFuture;

use crate::servers::{self, api, discovery, AppBase, AppCreatorBase, Constellation, ServerBase};

/// PubHubs Central server
pub struct Server {
    base: ServerBase,
}

impl crate::servers::Server for Server {
    const NAME: crate::servers::Name = crate::servers::Name::PubhubsCentral;
    type AppT = Rc<App>;
    type AppCreatorT = AppCreator;

    fn new(config: &crate::servers::Config) -> Self {
        Server {
            base: ServerBase::new::<Server>(config),
        }
    }

    fn app_creator(&self) -> AppCreator {
        let xconf = &self.base.config.phc.as_ref().unwrap().extra;

        AppCreator {
            base: AppCreatorBase::new(&self.base),
            transcryptor_url: xconf.transcryptor_url.clone(),
            auths_url: xconf.auths_url.clone(),
            livekit_url: xconf.livekit_url.clone(),
        }
    }

    fn base_mut(&mut self) -> &mut ServerBase {
        &mut self.base
    }
}

pub struct App {
    base: AppBase<Server>,
    transcryptor_url: url::Url,
    auths_url: url::Url,
    livekit_url: url::Url
}

impl crate::servers::App<Server> for Rc<App> {
    fn configure_actix_app(&self, _sc: &mut web::ServiceConfig) {}

    fn discover(
        &self,
        _phc_di: api::DiscoveryInfoResp,
    ) -> LocalBoxFuture<'_, api::Result<Constellation>> {
        Box::pin(async {
            let (tdi_res, asdi_res, lki_res) = tokio::join!(
                self.discovery_info_of(servers::Name::Transcryptor, &self.transcryptor_url),
                self.discovery_info_of(servers::Name::AuthenticationServer, &self.auths_url),
                self.discovery_info_of(servers::Name::LikeKitAuth, &self.livekit_url)
            );

            let tdi = api::return_if_ec!(tdi_res);
            let asdi = api::return_if_ec!(asdi_res);
            let lki = api::return_if_ec!(lki_res);

            api::ok(crate::servers::Constellation {
                phc_url: self.base.phc_url.clone(),
                phc_jwt_key: self.base.jwt_key.verifying_key().into(),
                transcryptor_url: self.transcryptor_url.clone(),
                transcryptor_jwt_key: tdi.jwt_key,
                auths_url: self.auths_url.clone(),
                auths_jwt_key: asdi.jwt_key,
                livekit_url: self.livekit_url.clone(),
                livekit_jwt_key: lki.jwt_key
                
            })
        })
    }

    fn base(&self) -> &AppBase<Server> {
        &self.base
    }
}

impl App {
    /// Obtains and checks [api::DiscoveryInfoResp] from the given server
    async fn discovery_info_of(
        &self,
        name: servers::Name,
        url: &url::Url,
    ) -> api::Result<api::DiscoveryInfoResp> {
        let tdi = api::return_if_ec!(api::query::<api::DiscoveryInfo>(url, &())
            .await
            .into_server_result());

        discovery::DiscoveryInfoCheck {
            phc_url: &self.base.phc_url,
            name,
            self_check_code: None,
            constellation: None,
        }
        .check(tdi, url)
    }
}

#[derive(Clone)]
pub struct AppCreator {
    base: AppCreatorBase,
    transcryptor_url: url::Url,
    auths_url: url::Url,
    livekit_url: url::Url
}

impl crate::servers::AppCreator<Server> for AppCreator {
    fn create(&self, shutdown_sender: &crate::servers::ShutdownSender<Server>) -> Rc<App> {
        Rc::new(App {
            base: AppBase::new(&self.base, shutdown_sender),
            transcryptor_url: self.transcryptor_url.clone(),
            auths_url: self.auths_url.clone(),
            livekit_url: self.livekit_url.clone(),
        })
    }
}
