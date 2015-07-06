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
		var result;
    socket.emit('newCode', newCode, function (err, code) {
			if (err){
				result = err;
				return console.error('New comment error:', err);
			}

			result = code
		});

		this.setState({
			code: newCode,
			result: result
		});
	},
	render () {
		var options = {
			lineNumbers: true
		};
		return (
			<div>
				<Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
				<Result value={this.state.result} />
			</div>
			);
	}
});

React.render(<App />, document.getElementById('editor'));
