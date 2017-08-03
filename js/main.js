$(document).ready(function(){
	$("#searchUser").on("keyup", function(e){
		let username = e.target.value;

		// make request to github
		$.ajax({
			url: "https://api.github.com/users/" + username,
			data: {
				client_id: "9fc8c3940aa95be14477",
				client_secret: "8b2e7cc6a5ab7d574a7098d35cc8f7981f2711fc"
			}
		}).done(function(user){
			user.created = moment(user.created_at).format('MMM. d, YYYY');
			!user.company ? user.company = "Unavailable" : user.company = user.company;
			!user.blog ? user.blog = "Unavailable" : user.blog = user.blog;
			!user.location ? user.location = "Unavailable" : user.location = user.location;
			$.ajax({
				url: "https://api.github.com/users/" + username +"/repos",
				data: {
				client_id: "9fc8c3940aa95be14477",
				client_secret: "8b2e7cc6a5ab7d574a7098d35cc8f7981f2711fc",
				sort: "created: asc",
				per_page: 100
			}
			}).done(function(repos){
				$.each(repos, function(index, repo){
					$("#repos").append(`
						<div class="well">
							<div class="row">
								<div class="col-md-7">
									<strong>${repo.name}</strong>: ${repo.description}
								</div>
								<div class="col-md-3">
									<span class="label label-default">Forks: ${repo.forks_count}</span>
									<span class="label label-primary">Watchers: ${repo.watchers_count}</span>
									<span class="label label-success">Stars: ${repo.stargazers_count}</span>
								</div>
								<div class="col-md-2">
									<a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
								</div>
							</div>
						</div>
					`)
				});
			});
			$("#profile").html(`
				<div class="panel panel-default">
				  <div class="panel-heading">
				    <h3 class="panel-title">${user.name}</h3>
				  </div>
				  <div class="panel-body">
				    <div class="row">
						<div class="col-md-3">
							<img class="thumbnail avatar" src="${user.avatar_url}">
							<a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
						</div>
						<div class="col-md-9">
							<span class="label label-default">Public Repos: ${user.public_repos}</span>
							<span class="label label-primary">Public Gists: ${user.public_gists}</span>
							<span class="label label-success">Followers: ${user.followers}</span>
							<span class="label label-info">Following: ${user.following}</span>
							<br><br>
							<ul class="list-group">
								<li class="list-group-item"><strong>Company:</strong> ${user.company}</li>
								<li class="list-group-item"><strong>Website:</strong> <a href="${user.blog}" target="_blank">${user.blog}</a></li>
								<li class="list-group-item"><strong>Location:</strong> ${user.location}</li>
								<li class="list-group-item"><strong>Member Since:</strong> ${user.created}</li>
							</ul>
						</div>
				    </div>
				  </div>
				</div>
				<h3 class="page-header">Latest Repos</h3>
				<div id="repos"></div>
			`);
		});
	});
});
