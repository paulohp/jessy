var React = require('react');
var Codemirror = require('react-codemirror');
var socket = io.connect();
var App = React.createClass({
	getInitialState () {
		return {
			code: '//Start codiging here..'
		};
	},
	updateCode (newCode) {
    socket.emit('newCode', newCode, function (err) {
			if (err)
				return console.error('New comment error:', err);
		});

		this.setState({
			code: newCode
		});
	},
	render () {
		var options = {
			lineNumbers: true
		};
		return <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />;
	}
});

React.render(<App />, document.getElementById('editor'));
