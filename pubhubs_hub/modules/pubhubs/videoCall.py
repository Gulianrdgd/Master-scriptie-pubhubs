from livekit import api
import asyncio



async def start_video_call(self, user, room_name):
    """Start a video call.
    This should be dumb, the authentication should be done in _web
    1. Should create room if it doesn't exist.
    2. Should create a video call.
    3. Should generate a token for the video call.
    """
    print("START VIDEO CALL")
    asyncio.get_event_loop().run_until_complete(create_room(self, room_name=room_name))
    token = await generate_access_token(self, pseudonym=user, username=user, room_name=room_name)
    room = "room_name"

    return token, room

async def generate_access_token(self, pseudonym, username, room_name):
    token = api.AccessToken(
        'devkey',
        'secret',
    ) \
        .with_identity(pseudonym) \
        .with_name(username) \
        .with_grants(api.VideoGrants(
        room_join=True,
        room=room_name,
    )).to_jwt()

    return token


async def create_room(self, room_name):
    lkapi = api.LiveKitAPI(
        'http://localhost:7880',
        'devkey',
        'secret'
    )

    print("ROOM NAME", room_name)

    print("Api.", api.ListRoomsRequest())

    livekit_rooms = await lkapi.room.list_rooms(api.ListRoomsRequest())

    print("ROOMS", livekit_rooms)

    for room in livekit_rooms:
        if room.name == room_name:
            return room


    room = await lkapi.room.create_room(api.CreateRoomRequest(name=room_name))

    print("ROOM created", room)
    await lkapi.aclose()

