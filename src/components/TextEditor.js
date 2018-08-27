import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

// import BoldMark from './BoldMark';
// import ItalicMark from './ItalicMark';
// import FormatToolbar from './FormatToolbar';

import { BoldMark, ItalicMark, FormatToolbar } from "./index"

import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';
import { underline } from 'react-icons-kit/feather/underline';

const initialValue = Value.fromJSON({
	document: {
		nodes: [
			{
				object: 'block',
				type: 'paragraph',
				nodes: [
					{
						object: 'text',
						leaves: [
							{
								text: 'Pastrami andouille corned beef buffalo ham jerky strip steak meatball hamburger filet mignon. Doner frankfurter pancetta landjaeger ball tip, pig pork t-bone filet mignon hamburger ham hock. Shankle pork loin tenderloin, beef meatloaf turducken jowl rump jerky hamburger tongue buffalo prosciutto shoulder venison. Venison tongue tri-tip, turducken frankfurter kevin capicola kielbasa. Pancetta pork chop capicola, tongue prosciutto sausage cow ribeye pastrami. Short ribs shoulder chuck, pastrami andouille turducken hamburger. Cow drumstick brisket strip steak tail, picanha buffalo shoulder.'
							},
						],
					},
				],
			},
		],
	},
});

export default class TextEditor extends Component {
	state = {
		value: initialValue,
	}

	onChange = ({ value }) => {
		this.setState({value})
	}

	onKeyDown = (e, change) => {
		console.log(e.key);
		if (!e.metaKey) { return }
		e.preventDefault();

		switch (e.key) {
			case 'b': {
				change.toggleMark('bold')
				return true
			}

			case 'i': {
				change.toggleMark('italic')
				return true
			}

			case 'c': {
				change.toggleMark('code')
				return true
			}

			case 'l': {
				change.toggleMark('list')
				return true
			}

			case 'u': {
				change.toggleMark('underline')
				return true
			}


			default: {
				return;
			}
		}
	}

	onIconClick = (e, type) => {
		e.preventDefault;
		const { value } = this.state;
		// const value = this.state.value;
		const change = value.change().toggleMark(type);
		this.onChange(change);
	}

	renderMark = props => {
		switch (props.mark.type) {
			case 'bold':
				return <BoldMark {...props} />;
				// return <bold {...props.attributes}>{props.children}</bold>;

			case 'italic':
				return <ItalicMark {...props} />;
				// return <italic {...props.attributes}>{props.children}</italic>;

			case 'code':
				return <code {...props.attributes}>{props.children}</code>;

			case 'list':
				return (
					<ul {...props.attributes}>
						<li>{props.children}</li>
					</ul>
				);

			case 'underline':
				return <u {...props.attributes}>{props.children}</u>;

			default:
				return
		}
	}

	render() {
		return (
			<Fragment>
				<FormatToolbar>
					<button
						onPointerDown={(e) => this.onIconClick(e, 'bold')}
						className="tooltip-icon-button">
						<Icon icon={bold} />
					</button>
					<button
						onPointerDown={(e) => this.onIconClick(e, 'italic')}
						className="tooltip-icon-button">
						<Icon icon={italic} />
					</button>
					<button
						onPointerDown={(e) => this.onIconClick(e, 'code')}
						className="tooltip-icon-button">
						<Icon icon={code} />
					</button>
					<button
						onPointerDown={(e) => this.onIconClick(e, 'list')}
						className="tooltip-icon-button">
						<Icon icon={list} />
					</button>
					<button
						onPointerDown={(e) => this.onIconClick(e, 'underline')}
						className="tooltip-icon-button">
						<Icon icon={underline} />
					</button>
				</FormatToolbar>
				<Editor
					value={this.state.value}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
					renderMark={this.renderMark}
				/>
			</Fragment>
		);
	}
}
