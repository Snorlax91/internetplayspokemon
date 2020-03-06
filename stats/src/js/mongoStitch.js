const client = stitch.Stitch.initializeDefaultAppClient('ipp-korzw');
const SECOND = 1000;
const MINUTE = 60*SECOND;
const HOUR = 60*MINUTE;
const DAY = 24*HOUR;
const WEEK = 7*DAY;

function gd(year, month, day) {
    return new Date(year, month - 1, day).getTime();
}


	  const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'ipp-service').db('test');
	  var uniqueUsers = "";
	  var uniqueUsersTwitch = "";
	  var uniqueUsersMixer = "";
	  var uniqueUsersYoutube = "";
	  twitchCountMessages = "";
	  mixerCountMessages = "";
	  youtubeCountMessages = "";
	  
		const aggUU = [
		  {
			'$group': {
			  '_id': '$username', 
			  'count': {
				'$sum': 1
			  }
			}
		  }, {
			'$count': 'username'
		  }
		];
		
		const aggUUT = [
		  {
			'$match': {
			  'platform': 'Twitch'
			}
		  }, {
			'$group': {
			  '_id': '$username', 
			  'count': {
				'$sum': 1
			  }
			}
		  }, {
			'$count': 'username'
		  }
		];
		
		const aggUUM = [
		  {
			'$match': {
			  'platform': 'Mixer'
			}
		  }, {
			'$group': {
			  '_id': '$username', 
			  'count': {
				'$sum': 1
			  }
			}
		  }, {
			'$count': 'username'
		  }
		];
		
		const aggUUY = [
		  {
			'$match': {
			  'platform': 'YouTube'
			}
		  }, {
			'$group': {
			  '_id': '$username', 
			  'count': {
				'$sum': 1
			  }
			}
		  }, {
			'$count': 'username'
		  }
		];
		
		const countMessage = [
		  {
			'$count': 'command'
		  }
		];
		
		const commandList = [
		  {
			'$group': {
			  '_id': '$command', 
			  'count': {
				'$sum': 1
			  }
			}
		  }, {
			'$sort': {
			  'count': -1
			}
		  }
		];
		
		const perPlatformPerc = [
		  {
			'$group': {
			  '_id': '$platform', 
			  'count': {
				'$sum': 1
			  }
			}
		  }
		];
		
	const aggregationUsersEver =	[
				{
					'$group': {
						'_id': {
							'username': '$username', 
							'platform': '$platform'
						}, 
						'count': {
							'$sum': 1
						}
					}
				}, {
					'$sort': {
						'count': -1
					}
				}
			]
	
	const aggragationMessagesByPlatoform = [
		  {
			'$group': {
			  '_id': '$platform', 
			  'count': {
				'$sum': 1
			  }
			}
		  }
		]
	
	function getMessageByDate(startDate, endDate){
		console.log(startDate + ' ' + endDate);
		db.collection('LOG_COMMAND').aggregate([
			  {
				'$match': {
				  'timestamp': {
					'$gte': startDate
				  }, 
				  'timestamp': {
					'$lte': endDate
				  }
				}
			  }, {
				'$count': 'commands'
			  }

			]).toArray()
		.then(commands => {
			
			console.log(commands[0]);
			return commands[0];			
			
		}).catch(err =>{
			console.error(err);
		});
		
	}
	
	function getMonthName(i){
		switch(i){
			case 0:
				return "January";
			case 1:
				return "February";
			case 2:
				return "March";
			case 3:
				return "April";
			case 4:
				return "May";
			case 5:
				return "June";
			case 6:
				return "July";
			case 7:
				return "August";
			case 8:
				return "September";
			case 9:
				return "October";
			case 10:
				return "November";
			case 11:
				return "December";
		}
	}



	  client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(user =>
			db.collection('LOG_COMMAND').aggregate(aggUU).toArray()
		).then(docs => {
		  uniqueUsers = docs[0].username;
		  $('#unique-users').html(uniqueUsers);
		  console.log("Unique Users: " + uniqueUsers);
		}).catch(err =>{
			console.error(err);
		});
		db.collection('LOG_COMMAND').aggregate(aggUUT).toArray()
		.then(docs => {
			uniqueUsersTwitch = docs[0].username;
			$('#unique-users-twitch').html(uniqueUsersTwitch);
			console.log("Unique Users YouTube: " + uniqueUsers);
		}).catch(err =>{
			console.error(err);
		});
		db.collection('LOG_COMMAND').aggregate(aggUUM).toArray()
		.then(docs => {
			uniqueUsersMixer = docs[0].username;
			$('#unique-users-mixer').html(uniqueUsersMixer);
			console.log("Unique Users Mixer: " + uniqueUsers);
		}).catch(err =>{
			console.error(err);
		});
		db.collection('LOG_COMMAND').aggregate(aggUUY).toArray()
		.then(docs => {
			uniqueUsersYoutube = docs[0].username;
			$('#unique-users-youtube').html(uniqueUsersYoutube);
			console.log("Unique Users Youtube: " + uniqueUsers);
		}).catch(err =>{
			console.error(err);
		});
		db.collection('LOG_COMMAND').aggregate(countMessage).toArray()
		.then(docs => {
			countMessages = docs[0].command;
			$('#count-messages').html(countMessages);
			console.log("Count messages: " + uniqueUsers);
		}).catch(err =>{
			console.error(err);
		});
		db.collection('LOG_COMMAND').aggregate(commandList).toArray()
		.then(commands => {
			var maxLength = 0;
			for(var i = 0; i<commands.length; i++){
				$('#command'+(i+1)).html(commands[i]._id);
				if(maxLength < commands[i].count){
					maxLength = commands[i].count;
					$('#progress-bar-'+(i+1)).css("width", "100%");
					$('#value-command'+(i+1)).html(commands[i].count);
				}else{
					$('#progress-bar-'+(i+1)).css("width", commands[i].count*100/maxLength + "%");
					$('#value-command'+(i+1)).html(commands[i].count);
				}
				
			}
			
			
		}).catch(err =>{
			console.error(err);
		});
		//Top Users Ever
		db.collection('LOG_COMMAND').aggregate(aggregationUsersEver).toArray()
		.then(users => {
			var maxLength = 0;
			for(var i = 0; i<users.length; i++){
				$('#user'+(i+1)).html(users[i]._id.username);
				if(maxLength < users[i].count){
					maxLength = users[i].count;
					$('#progress-bar-user-'+(i+1)).css("width", "100%");
					$('#value-user'+(i+1)).html(users[i].count);

				}else{
					$('#progress-bar-user-'+(i+1)).css("width", users[i].count*100/maxLength + "%");
					$('#value-user'+(i+1)).html(users[i].count);
				}
				if(users[i]._id.platform == 'Twitch'){
					$('#progress-bar-user-'+(i+1)).addClass('bg-yellow');
				}else if(users[i]._id.platform == 'Mixer'){
					$('#progress-bar-user-'+(i+1)).addClass('bg-blue');
				}else if(users[i]._id.platform == 'YouTube'){
					$('#progress-bar-user-'+(i+1)).addClass('bg-red');
				}
			}
			
			
		}).catch(err =>{
			console.error(err);
		});
		
		db.collection('LOG_COMMAND').aggregate(perPlatformPerc).toArray()
		.then(platforms => {
			var maxLength = 0;
			var maxPlatform = "";
			for(var i = 0; i<platforms.length; i++){
				if(platforms[i]._id == 'Twitch'){
					twitchCountMessages = platforms[i].count;
					$('#twitch-p').html(Math.round(platforms[i].count*100/countMessages) + "%");
					if(twitchCountMessages>maxLength){
						maxLength = twitchCountMessages;
						maxPlatform = "Twitch";
					}
				}else if(platforms[i]._id == 'Mixer'){
					mixerCountMessages = platforms[i].count;
					$('#mixer-p').html(Math.round(platforms[i].count*100/countMessages) + "%");
					if(mixerCountMessages>maxLength){
						maxLength = mixerCountMessages;
						maxPlatform = "Mixer";
					}
				}else if(platforms[i]._id == 'YouTube'){
					youtubeCountMessages = platforms[i].count;
					$('#youtube-p').html(Math.round(platforms[i].count*100/countMessages) + "%");
					if(youtubeCountMessages>maxLength){
						maxLength = youtubeCountMessages;
						maxPlatform = "YouTube";
					}
				}
				if(maxPlatform == 'Twitch'){
					$('#twitch-messages').css("width", "100%");
					$('#mixer-messages').css("width", mixerCountMessages*100/maxLength);
					$('#youtube-messages').css("width", youtubeCountMessages*100/maxLength);
				}else if(maxPlatform == 'Mixer'){
					$('#twitch-messages').css("width", twitchCountMessages*100/maxLength);
					$('#mixer-messages').css("width", "100%");
					$('#youtube-messages').css("width", youtubeCountMessages*100/maxLength);
				}else if(maxPlatform == 'YouTube'){
					$('#twitch-messages').css("width", twitchCountMessages*100/maxLength);
					$('#mixer-messages').css("width", mixerCountMessages*100/maxLength);
					$('#youtube-messages').css("width", "100%");
				}
			}
			
			
			
			init_chart_doughnut();
			
		}).catch(err =>{
			console.error(err);
		});
		
		
		
		var now = new Date();
		
		var day1 = "";
		var date1 = gd(now.getUTCFullYear(), now.getUTCMonth()+1, now.getUTCDate())-7*DAY;
		var date2 = gd(now.getUTCFullYear(), now.getUTCMonth()+1, now.getUTCDate())-6*DAY;
		var date3 = gd(now.getUTCFullYear(), now.getUTCMonth()+1, now.getUTCDate())-5*DAY;
		var date4 = gd(now.getUTCFullYear(), now.getUTCMonth()+1, now.getUTCDate())-4*DAY;
		var date5 = gd(now.getUTCFullYear(), now.getUTCMonth()+1, now.getUTCDate())-3*DAY;
		var date6 = gd(now.getUTCFullYear(), now.getUTCMonth()+1, now.getUTCDate())-2*DAY;
		var date7 = gd(now.getUTCFullYear(), now.getUTCMonth()+1, now.getUTCDate())-1*DAY;
		var date8 = gd(now.getUTCFullYear(), now.getUTCMonth()+1, now.getUTCDate());		
		
		db.collection('LOG_COMMAND').aggregate([
			  {
				'$match': {
				  'timestamp': {
					'$gte': date1,
					'$lt': date2
				  }
				}
			  }, {
				'$count': 'commands'
			  }

			]).toArray()
		.then(commands => {
			
			console.log(commands[0]);		
			if(commands[0] != undefined){
				day1=commands[0].commands;
			}else{
				day1=0;
			}
		}).catch(err =>{
			console.error(err);
		});
		
		var day2 = "";
		db.collection('LOG_COMMAND').aggregate([
			  {
				'$match': {
				  'timestamp': {
					'$gte': date2,
					'$lt': date3
				  }
				}
			  }, {
				'$count': 'commands'
			  }

			]).toArray()
		.then(commands => {
			
			console.log(commands[0]);		
			if(commands[0] != undefined){
				day2=commands[0].commands;
			}else{
				day2=0;
			}
		}).catch(err =>{
			console.error(err);
		});
		
		var day3 = "";
		db.collection('LOG_COMMAND').aggregate([
			  {
				'$match': {
				  'timestamp': {
					'$gte': date3,
					'$lt': date4
				  }
				}
			  }, {
				'$count': 'commands'
			  }

			]).toArray()
		.then(commands => {
			
			console.log(commands[0]);		
			if(commands[0] != undefined){
				day3=commands[0].commands;
			}else{
				day3=0;
			}
		}).catch(err =>{
			console.error(err);
		});
		
		var day4 = "";
		db.collection('LOG_COMMAND').aggregate([
			  {
				'$match': {
				  'timestamp': {
					'$gte': date4,
					'$lt': date5
				  }
				}
			  }, {
				'$count': 'commands'
			  }

			]).toArray()
		.then(commands => {
			
			console.log(commands[0]);		
			if(commands[0] != undefined){
				day4=commands[0].commands;
			}else{
				day4=0;
			}
		}).catch(err =>{
			console.error(err);
		});
		
		var day5 = "";
		db.collection('LOG_COMMAND').aggregate([
			  {
				'$match': {
				  'timestamp': {
					'$gte': date5,
					'$lt': date6
				  }
				}
			  }, {
				'$count': 'commands'
			  }

			]).toArray()
		.then(commands => {
			
			console.log(commands[0]);		
			if(commands[0] != undefined){
				day5=commands[0].commands;
			}else{
				day5=0;
			}
		}).catch(err =>{
			console.error(err);
		});
		
		var day6 = "";
		db.collection('LOG_COMMAND').aggregate([
			  {
				'$match': {
				  'timestamp': {
					'$gte': date6,
					'$lt': date7
				  }
				}
			  }, {
				'$count': 'commands'
			  }

			]).toArray()
		.then(commands => {
			
			console.log(commands[0]);		
			if(commands[0] != undefined){
				day6=commands[0].commands;
			}else{
				day6=0;
			}
		}).catch(err =>{
			console.error(err);
		});
		
		var day7 = "";
		db.collection('LOG_COMMAND').aggregate([
			  {
				'$match': {
				  'timestamp': {
					'$gte': date7,
					'$lt': date8
				  }
				}
			  }, {
				'$count': 'commands'
			  }

			]).toArray()
		.then(commands => {
			
			console.log(commands[0]);
			if(commands[0] != undefined){
				day7=commands[0].commands;
			}else{
				day7=0;
			}
			var dateStart = new Date(date1);
			var dateEnd = new Date(date7);
			$("#range-date").html( dateStart.getDate() + " "+ getMonthName(dateStart.getMonth()) +" "+ dateStart.getFullYear() + " - " +  dateEnd.getDate() + " "+ getMonthName(dateEnd.getMonth()) +" "+ dateEnd.getFullYear());
			init_flot_chart();
			
		}).catch(err =>{
			console.error(err);
		});