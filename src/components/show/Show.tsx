import React from "react";

type ShowProps = {
	children: React.ReactNode[];
};

const Show: React.FC<ShowProps> = ({ children }) => {
	const content = React.Children.toArray(children).map((child) => {
		if (React.isValidElement(child) && child.type === ShowIf) {
			const { condition } = child.props as ShowIfProps;
			return condition ? child.props.children : null;
		} else if (React.isValidElement(child) && child.type === ShowElse) {
			return (child.props as ShowElseProps).children;
		} else {
			return child;
		}
	});

	return content;
};

type ShowIfProps = {
	children: React.ReactNode;
	condition: boolean;
};

const ShowIf: React.FC<ShowIfProps> = ({ children }) => children;

type ShowElseProps = {
	children: React.ReactNode;
};

const ShowElse: React.FC<ShowElseProps> = ({ children }) => children;

export { ShowIf, ShowElse, Show };
