//! Additional endpoints provided by PubHubs Central
use crate::api::*;
use serde::{Deserialize, Serialize};

/// `.ph/hubs/...` endpoints
pub mod hub {
    use super::*;
    /// Used by a hub to request a ticket (see [TicketContent]) from PubHubs Central.
    /// The request must be signed for the `verifying_key` advertised by the hub info endoint
    /// (see crate::api::hub::Info).
    pub struct Ticket {}
    impl EndpointDetails for Ticket {
        type RequestType = Signed<TicketReq>;
        type ResponseType = Signed<TicketContent>;

        const METHOD: http::Method = http::Method::POST;
        const PATH: &'static str = ".ph/hubs/ticket";
    }

    having_message_code!(TicketReq, PhcHubTicketRequest);

    #[derive(Serialize, Deserialize, Debug, Clone)]
    pub struct TicketReq {
        pub name: crate::hub::Name,
    }

    /// A ticket, a [Signed] [TicketContent], certifies that the named hub uses the given
    /// `verifying_key`.
    #[derive(Serialize, Deserialize, Debug)]
    pub struct TicketContent {
        pub name: crate::hub::Name,
        pub verifying_key: VerifyingKey,
    }

    having_message_code!(TicketContent, PhcHubTicket);
}
