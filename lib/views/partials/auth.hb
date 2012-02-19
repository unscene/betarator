{{#if everyauth.loggedin}}
    <div id="user">
		Welcome, {{user.firstName}} {{user.lastName}}! <a href="/logout">Logout</a>
	</div>
{{else}}
	<div id="user">
		<a href="/auth/facebook">Login</a>
	</div>
{{/if}}