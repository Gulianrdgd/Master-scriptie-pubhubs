import logging

from synapse.http.server import DirectServeJsonResource, respond_with_json
from synapse.http.servlet import parse_string
from synapse.http.site import SynapseRequest
from synapse.module_api import ModuleApi

from livekit import api
import asyncio
import re

from ._constants import LIVEKIT_URL, CLIENT_URL
from ._store import YiviRoomJoinStore

logger = logging.getLogger(__name__)

async def _create_room(room_id):
    # Hardcoded url for now, we could have multiple servers up and balance between them.
    lkapi = api.LiveKitAPI(
        LIVEKIT_URL,
        'devkey',
        'YAjhCt37a898NLNEhiKpFY6GG8sXfiTL'
    )
    livekit_rooms = await lkapi.room.list_rooms(api.ListRoomsRequest())

    for room in livekit_rooms.rooms:
        if room.name == room_id:
            return room

    room = await lkapi.room.create_room(api.CreateRoomRequest(name=room_id))

    await lkapi.aclose()


async def _generate_access_token(pseudonym, username, room_name):
    print("GENERATE TOKEN, pseudonym", pseudonym, "username", username, "room_name", room_name)
    token = api.AccessToken(
        "devkey",
        "YAjhCt37a898NLNEhiKpFY6GG8sXfiTL"
    ).with_grants(api.VideoGrants(room_join=True, room=room_name)).with_identity(pseudonym).with_name(username).to_jwt()

    # Hardcoded url for now, we could have multiple servers up and balance between them.

    return token, LIVEKIT_URL


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
        """Get a access token"""

        # Authenticate the user
        user = await self.module_api.get_user_by_req(request)
        room_name = parse_string(request, "room_id")

        # Get the name that the user has requested
        token, livekit_url = await _generate_access_token(pseudonym=user.authenticated_entity, username=user.authenticated_entity, room_name=room_name)

        respond_with_json(request, 200, {"token": token, "livekit_url": livekit_url}, True)
    async def _async_render_POST(self, request: SynapseRequest):
        """Create a new video call room"""

        user = await self.module_api.get_user_by_req(request)

        room_id = parse_string(request, "room_id")

        try:
            asyncio.get_event_loop().run_until_complete(_create_room(room_id=room_id))
            respond_with_json(request, 200, {}, True)
        except TypeError as e:
            print("ERROR", e)
            respond_with_json(request, 400, {"errors": f"{str(e)}"}, True)
