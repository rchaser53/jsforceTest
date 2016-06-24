import jsforce from 'jsforce';

window.onload = function(){
	document.querySelector("#submitBtn").addEventListener("click",(e)=>{
		console.log(e);

		var conn = new jsforce.Connection({
							instanceUrl: 'https://rchasertest-dev-ed.my.salesforce.com/',
							proxyUrl: 'http://localhost:3000/proxy'
						});
		conn.login('dusk14@excite.co.jp', 'b0am1138', (err, res)=>{
			if (err){
				return console.error(err);
			}

			conn.query('SELECT Id, Name FROM Account', function(err, res) {
				if (err){
					return console.error(err);
				}
				console.log(res);
			});
		});
	})
}