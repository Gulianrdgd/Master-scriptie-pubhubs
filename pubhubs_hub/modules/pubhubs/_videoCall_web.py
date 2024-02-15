import logging

from synapse.api.errors import Codes, LoginError
from synapse.handlers.room import RoomCreationHandler, RoomShutdownHandler
from synapse.http.server import DirectServeJsonResource, respond_with_json
from synapse.http.servlet import parse_json_object_from_request
from synapse.http.site import SynapseRequest
from synapse.module_api import ModuleApi
from synapse.types import Requester

from ._store import YiviRoomJoinStore
from .videoCall import *

logger = logging.getLogger(__name__)


class VideoCallServlet(DirectServeJsonResource):
    """The secured rooms controller containing its basic CRUD functionality."""

    def __init__(
        self,
        config: dict,
        store: YiviRoomJoinStore,
        api: ModuleApi,
    ):
        super().__init__()
        self.config = config
        self.store = store
        self.module_api = api

    async def _async_render_GET(self, request: SynapseRequest):
        """List all secured rooms."""
        await self.assert_is_admin(request)
        rooms = await self.store.get_secured_rooms()
        rooms = [room.to_dict() for room in rooms]
        respond_with_json(request, 200, rooms, True)
        pass

    async def _async_render_POST(self, request: SynapseRequest):
        """Create a new secured room"""

        print("POST", request)

        user = await self.assert_is_admin(request)

        try:
            request_body = parse_json_object_from_request(request)
            print("BODY:", request_body)
            token, room_id = await start_video_call(self, request)


            respond_with_json(request, 200, {}, True)
        except TypeError as e:
            respond_with_json(request, 400, {"errors": f"{str(e)}"}, True)

    async def assert_is_admin(self, request: SynapseRequest) -> Requester:
        user = await self.module_api.get_user_by_req(request)
        if not await self.module_api.is_user_admin(user.user.to_string()):
            raise LoginError(401, "Not an admin", errcode=Codes.UNAUTHORIZED)
        return user

