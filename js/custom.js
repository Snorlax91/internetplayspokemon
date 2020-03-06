const client = stitch.Stitch.initializeDefaultAppClient('ipp-korzw');
const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'ipp-service').db('test');

var messages = "";
var uniqueUsersTwitch = "";
var uniqueUsersMixer = "";
var uniqueUsersYoutube = "";

const aggUUT = [{'$match': {'platform': 'Twitch'}}, {'$group': {'_id': '$username', 'count': {'$sum': 1 }}}, {'$count': 'username'}];
const aggUUM = [{'$match': {'platform': 'Mixer'}}, {'$group': {'_id': '$username', 'count': {'$sum': 1 }}}, {'$count': 'username'}];
const aggUUY = [{'$match': {'platform': 'YouTube'}}, {'$group': {'_id': '$username', 'count': {'$sum': 1 }}}, {'$count': 'username'}];
const countMessage = [{'$count': 'command'}];

client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(user =>
	db.collection('LOG_COMMAND').aggregate(countMessage).toArray()
).then(docs => {
	messages = docs[0].command;
	$('#commands-received').html(messages);
	$('#commands-received').addClass('stats__count');
	console.log("Unique Users: " + messages);
	clStatCount();
}).catch(err =>{
	console.error(err);
});
db.collection('LOG_COMMAND').aggregate(aggUUT).toArray()
.then(docs => {
	uniqueUsersTwitch = docs[0].username;
	$('#unique-tw-us').html(uniqueUsersTwitch);
	$('#unique-tw-us').addClass('stats__count');
	console.log("Unique Users YouTube: " + uniqueUsersTwitch);
}).catch(err =>{
	console.error(err);
});
db.collection('LOG_COMMAND').aggregate(aggUUM).toArray()
.then(docs => {
	uniqueUsersMixer = docs[0].username;
	$('#unique-mx-us').html(uniqueUsersMixer);
	$('#unique-mx-us').addClass('stats__count');
	console.log("Unique Users Mixer: " + uniqueUsersMixer);
}).catch(err =>{
	console.error(err);
});
db.collection('LOG_COMMAND').aggregate(aggUUY).toArray()
.then(docs => {
	uniqueUsersYoutube = docs[0].username;
	$('#unique-yt-us').html(uniqueUsersYoutube);
	$('#unique-yt-us').addClass('stats__count');
	console.log("Unique Users Youtube: " + uniqueUsersYoutube);
}).catch(err =>{
	console.error(err);
});

/* Stat Counter
* ------------------------------------------------------ */
var clStatCount = function() {
	
	var statSection = $(".s-stats"),
		stats = $(".stats__count");

	statSection.waypoint({

		handler: function(direction) {

			if (direction === "down") {

				stats.each(function () {
					var $this = $(this);

					$({ Counter: 0 }).animate({ Counter: $this.text() }, {
						duration: 4000,
						easing: 'swing',
						step: function (curValue) {
							$this.text(Math.ceil(curValue));
						}
					});
				});

			} 

			// trigger once only
			this.destroy();

		},

		offset: "90%"

	});
};