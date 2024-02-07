from livekit import api

lkapi = api.LiveKitAPI(
    'http://localhost:7880',
)

async def start_video_call(self, request):
    """Start a video call.
    1. Should authenticate the user.
    2. Should check if the user is allowed to start a video call.
    3. Should create room if it doesn't exist.
    4. Should create a video call.
    5. Should generate a token for the video call.
    """



    pass

async def generate_access_token(self, pseudonym, username, room_name):
    token = api.AccessToken() \
        .with_identity(pseudonym) \
        .with_name(username) \
        .with_grants(api.VideoGrants(
        room_join=True,
        room=room_name,
    )).to_jwt()

    return token


async def create_room(self, room_name):
    livekit_rooms = await lkapi.room.list_rooms(api.ListRoomsRequest())

    for room in livekit_rooms.rooms:
        if room.name == room_name:
            return room


    room = await lkapi.room.create_room(api.CreateRoomRequest(name=room_name))
    return room

