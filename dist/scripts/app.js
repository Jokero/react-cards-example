var Card = React.createClass({
    displayName: "Card",

    onDelete: function () {
        alert("It's not like! It's deleting :)");
    },

    render: function () {
        return React.createElement(
            "div",
            { className: "card col-lg-3 col-md-3 col-sm-6 col-xs-12" },
            React.createElement(
                "div",
                { className: "card-info" },
                React.createElement(
                    "h1",
                    { className: "card-info-title" },
                    React.createElement("span", { className: 'card-info-title-icon ' + this.props.data.iconClass }),
                    React.createElement(
                        "span",
                        { className: "card-info-title-text" },
                        this.props.data.title
                    )
                ),
                React.createElement(
                    "p",
                    { className: "card-info-description" },
                    this.props.data.description
                )
            ),
            React.createElement(
                "div",
                { className: "card-background" },
                React.createElement("div", { className: "card-background-image", style: { backgroundImage: 'url(' + this.props.data.imageUrl + ')' } }),
                React.createElement("div", { className: "card-background-overlay" })
            ),
            React.createElement(
                "div",
                { className: "card-controls" },
                React.createElement(
                    "a",
                    { href: this.props.data.url, className: "btn btn-default", target: "blank" },
                    "Open"
                ),
                React.createElement(
                    "button",
                    { type: "button", className: "btn btn-default" },
                    "Print"
                ),
                React.createElement(
                    "button",
                    { type: "button", className: "btn btn-danger", onClick: this.onDelete },
                    "Delete"
                )
            )
        );
    }
});

var CardsList = React.createClass({
    displayName: "CardsList",

    getInitialState: function () {
        return { data: [] };
    },

    componentDidMount: function () {
        $.getJSON(this.props.url, (function (data) {
            this.setState({ data: data });
        }).bind(this));
    },

    render: function () {
        var cards = this.state.data.map(function (data) {
            return React.createElement(Card, { data: data });
        });

        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                this.props.title
            ),
            React.createElement(
                "div",
                { className: "cardsList row" },
                cards
            )
        );
    }
});

ReactDOM.render(React.createElement(CardsList, { title: "Miss World 2015 Top 20", url: "src/data.json" }), document.getElementById('cardsList'));