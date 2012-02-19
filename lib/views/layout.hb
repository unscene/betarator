<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
	<head>
		<title>{{title}}</title>
		<link rel="stylesheet" href="/bootstrap/less/bootstrap.less" type="text/css" media="screen" title="bootstrap styles" charset="utf-8">
		<link rel="stylesheet" href="/styles.less" type="text/css" media="screen" title="betarator styles" charset="utf-8">
		<script src="javascripts/less-1.2.1.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div class="navbar navbar-fixed-top">
			<div class="container">
				<div class="pull-right">
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div id="main-search" class="alert alert-info alert-no-close">
					<span class="help-inline">
						<strong>Betarator</strong> Search for the best beta from around the globe.
					</span>	
					<form class="pull-right" action="/search" method="get" accept-charset="utf-8">
						<input class="input-xlarge" type="text" name="query" placeholder="Type a grade, region, problem, name... etc."/>
						<button class="btn btn-primary" type="Submit" value="Search"/>
					</form>
				</div>
			</div>
		</div>               		
	</body>
</html>
