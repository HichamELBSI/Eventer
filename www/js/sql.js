	var app = angular.module('sql', []);
	app.constant("DB_CONFIG",  {
    name: 'gto6',	
	version:'1.1',
	description: "database",
    tables: [
		{
			name: 'Voyage',
			columns: [
				{name: 'id', type: 'INTEGER  PRIMARY KEY AUTOINCREMENT'},
				{name: 'Name', type: 'text NOT NULL'},
				{name: 'datedebut', type: 'int NOT NULL'},
				{name: 'datefin', type: 'int NOT NULL'},
				{name: 'estimation', type: ' int NULL'},
				{name: 'description', type: 'text NULL'},
				{name: 'url', type: 'text NULL'}
			]
        },
		{
			name: 'VoyageParticipant',
			columns: [
				{name: 'id', type: 'INTEGER  PRIMARY KEY AUTOINCREMENT'},
				{name: 'id_Voyage', type: 'integer'},
				{name: 'id_Participant', type: 'integer'},				
				{name: 'budget', type: 'int NULL'},
				{name: 'FOREIGN KEY (id_Voyage) ', type:'REFERENCES Voyage(id)'},
				{name: 'FOREIGN KEY (id_Participant) ', type:'REFERENCES Participant(id)'}
	
	
			]
        },
		{
			name: 'Participant',
			columns: [
				{name: 'id', type: 'INTEGER  PRIMARY KEY AUTOINCREMENT'},
				{name: 'Name', type: 'text NOT NULL'},
				{name: 'url', type: 'text NULL'}
			]
        },
		{
            name: 'Article',
            columns: [
				{name: 'id', type: 'INTEGER  PRIMARY KEY AUTOINCREMENT'},
                {name: 'id_VoyageParticipant', type: 'integer NOT NULL'},
				{name: 'status', type: 'text NOT NULL'},
                {name: 'Name', type: 'text NOT NULL'},
                {name: 'Categorie', type: 'text NOT NULL'},
                {name: 'Prix', type: 'integer NOT NULL'},
                {name: 'Commentaire', type: 'text NULL'},
                {name: 'date', type: 'integer NULL'},
				{name:'FOREIGN KEY (id_VoyageParticipant) ', type:'REFERENCES VoyageParticipant(id)'}
	
            ]
        }
    ]
});
	app.run(function(model) {
		//console.log('eeee');
		model.init();
	});

	app.controller('IndexCtrl', function($scope,Voyage,DB_CONFIG,Participant,Article,VoyageParticipant) {
		
		/*******************Voyage*******************************/
		var insertVoyage = {
			estimation:550,
			Name:'pdfg',			
			datedebut:789561212,
			datefin:789581212,
			description:'yeah!!!',
			url:'gto',
		};
		var updateVoyage = {
			id:5,
			estimation:550,
			Name:'FMA',
			datedebut:789561212,
			datefin:789581212,
			description:'yeah!!!!',
			url:'gto',
			Participant:[]
		 };
		var removeVoyage=1;
		/*******************User*******************************/
		var insertUser = {
			Name:'Neil Amstrogne',
			url:'gto',
		};
		var updateUser = {
			id:2,
			Name:'rabah',
			url:'gto',
		};
		var removeUser=2;
		/*******************Article*******************************/
		var insertArticle = {
			id_VoyageParticipant:1,
			status:'public',
			Name:'viande',
			Categorie : 'ion-pizza',
			Prix:200,
			Commentaire:'je sais pas j ai oublier j ai pas toucher',
			date:1431255776
		};
		var updateArticle = {
			id:1,
			id_Participant:1,
			status:'public',
			Name:'essence',
			Categorie : 'ion-pizza',
			Prix:200,
			Commentaire:'yooje sais pas j ai oublier j ai pas toucher',
			date:1431255776
		};
		var removeArticle=1;
		/*******************Participant*******************************/
		var insertVoyageParticipant = {
			id_Voyage:3,
			id_Participant:4,
			budget:1
		};
		var updateVoyageParticipant = {
			id:1,
			id_Voyage:2,
			id_Participant:1
		};
		var removeVoyageParticipant=1;
		
		$scope.datas = [];
		$scope.data = null;
		
		//VoyageParticipant.addVoyageParticipant(insertVoyageParticipant);
		
		/*Participant.getAllParticipant(2).then(function(datas){
			$scope.datas = datas;
		}); */
		Voyage.getAllVoyage(2).then(function(datas){
			$scope.datas = datas;
		}); 
		/*
		Voyage.allVoyages().then(function(datas){
			$scope.datas = datas;
		}); 
		Voyage.getById(5).then(function(data) {
			$scope.data = data;
		});
		Voyage.addVoyages(insertVoyage);
		Voyage.updateVoyage(updateVoyage);
		Voyage.removeVoyage(removeVoyage);//*/
		
		/*
		VoyageParticipant.allVoyageParticipant().then(function(datas){
			$scope.datas = datas;
		}); 
		VoyageParticipant.getById(5).then(function(data) {
			$scope.data = data;
		});
		VoyageParticipant.addVoyageParticipant(insertVoyageParticipant);
		VoyageParticipant.updateVoyageParticipant(updateVoyageParticipant);
		VoyageParticipant.removeVoyageParticipant(removeVoyageParticipant);*/
		/*
		Participant.allParticipant().then(function(datas){
			$scope.datas = datas;
		}); 
		Participant.getById(5).then(function(data) {
			$scope.data = data;
		});
		Participant.addParticipant(insertUser);		
		Participant.updateParticipant(updateUser);
		Participant.removeParticipant(removeUser);//*/
		/*
		Article.allArticle().then(function(datas){
			$scope.datas = datas;
		}); 
		Article.getById(5).then(function(data) {
			$scope.data = data;
		});
		Article.addArticle(insertArticle);
		Article.updateArticle(updateArticle);
		Article.removeArticle(removeArticle);//*/
		
	});
	
	app.factory('model', function($q, DB_CONFIG) {
		var self = this;
		self.db = null;
	 
		self.init = function() {
			self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
			angular.forEach(DB_CONFIG.tables, function(table) {
				var columns = []; 
				angular.forEach(table.columns, function(column) {
					columns.push(column.name + ' ' + column.type);
				}); 
				var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
				self.query(query);
				console.log('Table ' + table.name + ' initialized');
			});
		};
	 
		
		self.query = function(query, bindings) {
			
			bindings = typeof bindings !== 'undefined' ? bindings : [];
			var deferred = $q.defer(); 
			console.log(query);
			console.log(bindings);
			self.db.transaction(function(transaction) {
				transaction.executeSql(query, bindings, function(transaction, result) {
					console.log(result);
					deferred.resolve(result);
				}, function(transaction, error) {
					console.log(error);
					deferred.reject(error);
				});
				
			}); 
			return deferred.promise;		
		};
	 
		self.fetchAll = function(result) {
			
			var output = []; 
			for (var i = 0; i < result.rows.length; i++) {
				output.push(result.rows.item(i));
			}  
			return output;
		};
	 
		self.fetch = function(result) {
			 if(result.rows.length > 0) {
                return result.rows.item(0);
            } else {
                console.log("fetch erreur");
				return null;
            }			
		};
	 
		return self;
	});
	app.factory('Voyage', function(model) {
		var self = this;
		
		self.allVoyages =  function() {  
			return model.query('SELECT * FROM Voyage')
			.then(function(result){
				return model.fetchAll(result);
			});
			
		};		
		self.getById = function(id) {
			return model.query('SELECT * FROM Voyage WHERE id = ?', [id])
			.then(function(result){
				return model.fetch(result);
			});
		}; 
		
		self.getAllVoyage =  function(idVoyage) {
			var parameters = [idVoyage];			
			return model.query('SELECT * FROM Voyage JOIN VoyageParticipant ON VoyageParticipant.id_Voyage = Voyage.id JOIN Participant ON Participant.id = VoyageParticipant.id_Participant WHERE Participant.id=(?)', parameters)
			.then(function(result){
				return model.fetchAll(result);
			});
			
		};
		
		self.addVoyages = function(insertVoyage) {
			var parameters = [insertVoyage.Name,insertVoyage.datedebut,insertVoyage.datefin,insertVoyage.description, insertVoyage.url, insertVoyage.estimation];
			return model.query("INSERT INTO Voyage (Name, datedebut, datefin, description, url, estimation) VALUES (?,?,?,?,?,?)", parameters);
			
		
		};
		self.removeVoyage = function(removeVoyage) {
			var parameters = [removeVoyage];
			return model.query("DELETE FROM Voyage WHERE id = (?)", parameters);
		}
		self.updateVoyage = function(updateVoyage) {
			var parameters = [updateVoyage.Name, updateVoyage.description, updateVoyage.url, updateVoyage.estimation, updateVoyage.id];
			return model.query("UPDATE Voyage SET Name = (?), description = (?), url = (?), estimation = (?) WHERE id = (?)", parameters);
		}

return self;
});
	app.factory('Participant', function(model) {
		var self = this;
		
		self.allParticipant =  function() {
			return model.query('SELECT * FROM Participant')
			.then(function(result){
				return model.fetchAll(result);
			});
			
		};
		
		self.getAllParticipant =  function(idVoyage) {
			var parameters = [idVoyage];			
			return model.query('SELECT Participant.* FROM Participant  JOIN VoyageParticipant ON Participant.id = VoyageParticipant.id_Participant'
			+' WHERE VoyageParticipant.id_Voyage =(?)', parameters)
			.then(function(result){
				return model.fetchAll(result);
			});
			
		};
		self.getByIdParticipant = function(id) {
			return model.query('SELECT * FROM Participant WHERE id = ?', [id])
			.then(function(result){
				return model.fetch(result);
			});
		}; 
		
		self.addParticipant = function(insertParticipant) {
			var parameters = [insertParticipant.Name, insertParticipant.url];
			return model.query("INSERT INTO Participant(Name, url) VALUES(?,?)", parameters);
		};
		self.removeParticipant = function(removeParticipant) {
			var parameters = [removeParticipant];
			return model.query("DELETE FROM Participant WHERE id = (?)", parameters);
		}
		 
		self.updateParticipant = function(updateParticipant) {
			var parameters = [updateParticipant.Name, updateParticipant.url, updateParticipant.id];
			return model.query("UPDATE Participant SET Name = (?), url = (?) WHERE id = (?)", parameters);
		}
		
		return self;
});
	app.factory('Article', function(model) {
		var self = this;
		
		self.allArticle =  function() {
			return model.query('SELECT * FROM Article')
			.then(function(result){
				return model.fetchAll(result);
			});
			
		};
		
		self.getByIdArticle = function(id) {
			return model.query('SELECT * FROM Article WHERE id = ?', [id])
			.then(function(result){
				return model.fetch(result);
			});
		}; 
		
		self.addArticle = function(insertArticle) {
			var parameters = [insertArticle.id_VoyageParticipant, insertArticle.status,insertArticle.Name,insertArticle.Categorie,insertArticle.Prix, insertArticle.Commentaire, insertArticle.date];
			return model.query("INSERT INTO Article (id_VoyageParticipant, status, Name, Categorie, Prix, Commentaire, date) VALUES (?,?,?,?,?,?,?)", parameters);
		};
		self.removeArticle = function(removeArticle) {
			var parameters = [removeArticle];
			return model.query("DELETE FROM Article WHERE id = (?)", parameters);
		}
		 
		self.updateArticle = function(updateArticle) {
			var parameters = [updateArticle.id_VoyageParticipant, updateArticle.status,updateArticle.Name,updateArticle.Categorie,updateArticle.Prix, updateArticle.Commentaire, updateArticle.date, updateArticle.id];
			return model.query("UPDATE Article SET id_VoyageParticipant= (?), status = (?), Name = (?),Categorie = (?),Prix = (?),Commentaire = (?), date = (?) WHERE id = (?)", parameters);
		}
		
		return self;
});
	app.factory('VoyageParticipant', function(model) {
			var self = this;
			
			self.allVoyageParticipant =  function() {
				return model.query('SELECT * FROM VoyageParticipant')
				.then(function(result){
					return model.fetchAll(result);
				});
				
			};			
			self.getByIdVoyageParticipant = function(id) {
				return model.query('SELECT * FROM VoyageParticipant WHERE id = ?', [id])
				.then(function(result){
					return model.fetch(result);
				});
			}; 				
			self.addVoyageParticipant = function(insertVoyageParticipant) {
				var parameters = [insertVoyageParticipant.id_Voyage, insertVoyageParticipant.id_Participant,insertVoyageParticipant.budget];
				return model.query("INSERT INTO VoyageParticipant (id_Voyage, id_Participant, budget) VALUES (?,?,?)", parameters);
			};
			self.removeVoyageParticipant = function(removeVoyageParticipant) {
				var parameters = [removeVoyageParticipant];
				return model.query("DELETE FROM VoyageParticipant WHERE id = (?)", parameters);
			};		 
			self.updateVoyageParticipant = function(updateVoyageParticipant) {
				var parameters = [updateVoyageParticipant.id_Voyage, updateVoyageParticipant.id_Participant,updateVoyageParticipant.budget,updateVoyageParticipant.id];
				return model.query("UPDATE VoyageParticipant SET id_Voyage= (?), id_Participant = (?), budget = (?) WHERE id = (?)", parameters);
			};			
			return self;
	});




		//	recuperer tout les article d'un utilisateur dans un voyage
			/*var getuser={
				id_Voyage:1,
				id_Participant:42
			}*/
		self.facebook = function(getuser){
			var parameters=[getuser.id_Voyage,getuser.id_Participant];			
			return model.query("SELECT Article.* FROM Article JOIN VoyageParticipant ON VoyageParticipant.id=Article.id_VoyageParticipant"
			+" WHERE VoyageParticipant.id_voyage = ? AND VoyageParticipant.id_Participant = ?", parameters)
			.then(function(result){
				return model.fetchAll(result);

			});
		};
		
		
		
		
		//recuperer un article d'un utilisateur d'un voyae 
				//id_Voyage:1,
			/*var getuser={
				id_Participant:42,
				id_Article:2
			}*/
		self.facebook = function(getuser){
			var parameters=[getuser.id_Voyage,getuser.id_Participant,getuser.id_Article];			
			return model.query("SELECT Article.* FROM Article JOIN VoyageParticipant ON VoyageParticipant.id=Article.id_VoyageParticipant"
			+" WHERE VoyageParticipant.id_voyage = ? AND VoyageParticipant.id_Participant = ? AND Article.id = ?", parameters)
			.then(function(result){
				return model.fetch(result);

			});
		};
		
		
		/*
		ajouter un article avec l'id d'un utilisateur et l'id d'un voyage 	
		var insertArticle = {
			id_Voyage:1,
			id_Participant:42,
			status:0,
			Name:'gto',
			Categorie : 'ion-pizza',
			Prix:200,
			Commentaire:'je sais pas j ai oublier j ai pas toucher',
			date:1431255776
			
		}
		
		autre.facebook(insertArticle);*/
		
		self.facebook = function(insertArticle){
			var parameters=[insertArticle.id_Voyage,insertArticle.id_Participant];			
			return model.query("SELECT id FROM VoyageParticipant  WHERE VoyageParticipant.id_voyage = ? AND VoyageParticipant.id_Participant = ? ", parameters)
			.then(function(result){
				var parameters = [model.fetch(result).id, insertArticle.status,insertArticle.Name,insertArticle.Categorie,insertArticle.Prix, insertArticle.Commentaire, insertArticle.date];
				return model.query("INSERT INTO Article (id_VoyageParticipant, status, Name, Categorie, Prix, Commentaire, date) VALUES (?,?,?,?,?,?,?)", parameters);
			});
		};
		
		
		/*{
			"Total":2095,
			"Participant":[
				{
					"Name":"Neil Amstrogne",
					"Prix":595,
					"arg3":452.5,
					"rest":0
					"ki":[
						{
							"Name":"Neil Amstrogne",
							"Prix":30,
						},
						{
							"Name":"rabah",
							"Prix":40,
						}
					]
				},
				{
					"Name":"rabah",
					"Prix":1500,
					"arg3":-452.5,
					"rest":0
					"ki":[
						{
							"Name":"Neil Amstrogne",
							"Prix":30,
						},
						{
							"Name":"rabah",
							"Prix":40,
						}
					]
				}
			]
		}
		
		*/
		
		
		self.Algo2 = function(id_voyage){
			var parameters=[1];	var totale=0;var gto;
			var naruto={ 
				"Total": 0, 
				"Participant": [] 
			};				
			return model.query("SELECT id,  id_Participant FROM VoyageParticipant WHERE id_Voyage = (?)",parameters)
			.then(function(result){	
					var data= model.fetchAll(result);					
					for (var i = 0; i < data.length; i++) {	
						var  parameters=[data[i].id,data[i].id_Participant];
						gto =model.query("SELECT SUM(Prix) , Participant.Name  FROM Article JOIN VoyageParticipant ON VoyageParticipant.id=Article.id_VoyageParticipant"
						+" JOIN Participant ON  Participant.id = VoyageParticipant.id_Participant"
						+" WHERE Article.id_VoyageParticipant = (?) AND VoyageParticipant.id_Participant=(?)",parameters)
						.then(function(result){							
							var data = model.fetch(result);
							naruto.Participant.push({"Name":data["Name"],"Prix":data["SUM(Prix)"],"arg3":0,"rest":0,"ki":[]});
							naruto.Total+=data["SUM(Prix)"];
							return naruto;							
						});
					}					
					console.log(gto);
					return gto;	
					
			}).then(function(result){
							
				console.log(result);
				for (var i = 0; i < result.Participant.length; i++) {
					result.Participant[i].arg3=result.Participant[i].rest=result.Total/result.Participant.length-result.Participant[i].Prix;
					
				}
				result.Participant.sort(function (a, b) {
					  if (a.Prix > b.Prix) {
						return -1;
					  }
					  if (a.Prix < b.Prix) {
						return 1;
					  }
					  return 0;
				});				
				return result;
			}).then(function(result){					
				for (var i = 0; i < result.Participant.length; i++) {
					//console.log("dans le for i= "+ -result.Participant[i].rest);
					var rest=result.Participant[i].rest;
					//console.log(rest);
					for (var j =result.Participant.length-1; j > 0; j--) {
						//console.log("dans le for j= "+j+"  "+(i!=j)+" "+i);
						
						if(i!=j){
							
							if(Math.sign(result.Participant[j].rest)==1){
								
								var toto= result.Participant[j].rest+result.Participant[i].rest;
								console.log(result.Participant[i].Name+" "+result.Participant[j].rest+"+"+result.Participant[i].rest+"= "+toto);								
								console.log(result.Participant[j].Name);								
								
								if(Math.sign(toto)==1){
									console.log("1");										
										
									//200-400 beaucoup tro
									result.Participant[i].ki.push({"Name":result.Participant[j].Name,"Prix":-result.Participant[i].rest});					
									result.Participant[j].ki.push({"Name":result.Participant[i].Name,"Prix":-result.Participant[i].rest});
									result.Participant[j].rest=toto;
									result.Participant[i].rest=0;
									//continue;
										
								}else{
									if(Math.sign(toto)==0){		
									console.log("0");										
												
										result.Participant[i].ki.push({"Name":result.Participant[j].Name,"Prix":result.Participant[j].rest});					
										result.Participant[j].ki.push({"Name":result.Participant[i].Name,"Prix":result.Participant[j].rest});
												
										result.Participant[i].rest=0;
										result.Participant[j].rest=0;
										//continue;
									}else{
										if(Math.sign(toto)==-1){
											console.log("-1");										
										result.Participant[i].ki.push({"Name":result.Participant[j].Name,"Prix":result.Participant[j].rest});					
										result.Participant[j].ki.push({"Name":result.Participant[i].Name,"Prix":result.Participant[j].rest});
											
										result.Participant[i].rest+=result.Participant[j].rest;
										result.Participant[j].rest=0;
										}
									}
								}
							}
						}
					}				
				}
							
				console.log(result);	
				return result;
			});
			
		};
		
		
		
	
		/**************************update****************************/
		
		self.removeVoyage = function(removeVoyage) {
			var parameters = [removeVoyage];
			model.query('SELECT id FROM VoyageParticipant WHERE id_Voyage = (?)', parameters)	
			.then(function(result){
				var datas= model.fetchAll(result);								
				angular.forEach(datas, function(data) {

				console.log(data.id);					
					model.query("DELETE FROM Article WHERE id_VoyageParticipant = (?)", [data.id]);
				});
				//console.log(data);
				model.query("DELETE FROM VoyageParticipant WHERE id_Voyage = (?)", parameters);
				model.query("DELETE FROM Voyage WHERE id = (?)", parameters);
			});
			
		}
		self.removeParticipant = function(removeParticipant) {
			var parameters = [removeParticipant];
			var idVP=model.query('SELECT id FROM VoyageParticipant WHERE id_Participant = (?)', parameters)
			.then(function(result){
				var datas= model.fetchAll(result);								
				angular.forEach(datas, function(data) {

				console.log(data.id);					
					model.query("DELETE FROM Article WHERE id_VoyageParticipant= (?)", [data.id]);
				});
					
				model.query("DELETE FROM VoyageParticipant WHERE id_Participant = (?)", parameters);
				model.query("DELETE FROM Participant WHERE id = (?)", parameters);
			});
		}
		self.removeArticle = function(removeArticle) {
			var parameters = [removeArticle];
			return model.query("DELETE FROM Article WHERE id = (?)", parameters);
		}
		
		
		/**************************update****************************/
		/*var updateArticle = { 
			status:0,
			Name:"essence",
			Categorie:"ion-autre",
			Prix:200,
			Commentaire:"je sais pas ", 
			date:12345678,
			id:9,	
			id_VoyageParticipant:3			
		}
		update.updateArticle(updateArticle);
		var updatParticipant = {
			Name:"RABAH",
			url:"GTO",
			id:4,
			budget:10000	
		}
		update.updatParticipant(updatParticipant);
		
		
		self.updateArticle = function(updateArticle) {			
			var parameters = [updateArticle.id_VoyageParticipant, updateArticle.status,updateArticle.Name,updateArticle.Categorie,updateArticle.Prix, updateArticle.Commentaire, updateArticle.date, updateArticle.id];
			model.query("UPDATE Article SET id_VoyageParticipant= (?), status = (?), Name = (?),Categorie = (?),Prix = (?),Commentaire = (?), date = (?) WHERE id = (?)", parameters);
		}		
		self.updatParticipant = function(updatParticipant) {
			var parameters1 =[updatParticipant.Name,updatParticipant.url,updatParticipant.id];
			var parameters2 =[updatParticipant.budget,updatParticipant.id];
			model.query("UPDATE Participant SET Name = (?), url = (?) WHERE id = (?)", parameters1);
			return model.query("UPDATE VoyageParticipant SET budget = (?) WHERE id_Participant = (?)", parameters2);
		}
		
		
		self.getArticle = function(getArticle) {
			var n=0;
			var articleall={ 
				"Voyage": getArticle, 
				"Participant": [] 
			};			
			var parameters = [getArticle];
			return model.query('SELECT Participant.id, Participant.Name FROM Participant'
			+' JOIN VoyageParticipant ON VoyageParticipant.id_Participant=Participant.id '
			+' WHERE id_Voyage = (?)', parameters)	
			.then(function(result){
				var data= model.fetchAll(result);
				//angular.forEach(datas, function(data) {
				for(var i=0; i<data.length; i++){
					//console.log(data.length);console.log(data.Name);
					articleall.Participant.push({"id":data[i].id, "Name":data[i].Name , "Articles":[]});
					 model.query('SELECT Article.id, Article.Prix, Article.Name, commentaire FROM Article '
					+'JOIN VoyageParticipant ON VoyageParticipant.id=Article.id_VoyageParticipant '
					+'WHERE VoyageParticipant.id_Voyage = (?)  AND VoyageParticipant.id_Participant= (?)',[getArticle,data[i].id])
					.then(function(result){
						var totos= model.fetchAll(result);
						//console.log(totos.length);
						//var i = articleall.Participant.length;
						//for(var i=0;i<articleall.Participant.length;i++){
							for(var j=0;j<totos.length;j++){
								articleall.Participant[n].Articles.push({'id' :totos[j].id,'prix':totos[j].Prix,'Name':totos[j].Name,'Commentaire':totos[j].Commentaire});
							}
							n++;
					});
					
				};
				return articleall;	
			});
		}
		var getPrixArticlesPrivate = {
			idVoyage:1,
			idParticipant:3,
			status:1
		}
		self.getPrixArticles =  function(getPrixArticles) {
			var parameters = [getPrixArticles.idVoyage,getPrixArticles.idParticipant,getPrixArticles.status];			
			return model.query('SELECT SUM( Prix ) FROM Article JOIN VoyageParticipant ON VoyageParticipant.id=Article.id_VoyageParticipant WHERE VoyageParticipant.id_Voyage = (?)  AND VoyageParticipant.id_Participant= (?) AND Article.status = (?)',parameters)
			.then(function(result){
				var datas=model.fetch(result);
				if(datas["SUM( Prix )"]!=null){
					return datas;
				}
				return 0;
			});			
		};ffffffff
		
		*/
		
		