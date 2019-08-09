# Quick start

[Globals.md](globals.md) contains the mapping of all files.
This project is structured in *repositories*, *feeds*, *entities* and *services*.
All of them provide a different level of abstraction. See [common tasks](#Common tasks) 
for the most used functionality. A common convention is to use `ig` as a name
for an instance of [`IgApiClient`](classes/_core_client_.igapiclient.md), so it's also used here.
 
- [**Repositories**](#Repositories) represent a collection of endpoints provided by the Instagram-API.
- [**Feeds**](#Feeds) represent (scrollable) lists consisting of multiple chained requests. 
These requests are automatically paginated using either `.items()` or `.request()`.
- [**Entities**](#Entities) provide an abstraction to concepts in the App such as the 
[`DirectThreadEntity`](classes/_entities_direct_thread_entity_.directthreadentity.md).
- [**Services**](#Services) provide abstractions such as collections of requests or pre-filled requests.
Prefer the usage of them.

# Common tasks
## Uploading
For uploading, use [`ig.publish`](classes/_services_publish_service_.publishservice.md).
The following also applies to album- and story-uploads.
#### Photo
All photos have to be jpeg-compressed and in the right aspect ratio (currently not checked at runtime).
#### Video
All videos have to use the mp4 container with H264 for the video-stream 
and AAC for the audio-stream.

## Feeds
To get a feed, you'll need to create an instance of it using `ig.feed`.
On the instantiated feed you can use the `.items()` method to request the items until
`.isMoreAvailable()` returns `false`.

## Liking
Use `ig.media.like({mediaId})`.
## Following
Use `if.friendship.create(userPk)`.
