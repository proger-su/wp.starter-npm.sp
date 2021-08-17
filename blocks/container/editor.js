const {registerBlockType} = wp.blocks;
const {TextControl} = wp.components;
const {__} = wp.i18n;

registerBlockType('starter/container', {
	title: __('Container', 'starter'),
	description: __('Descr', 'starter'),
	icon: 'editor-table',
	category: 'starter',
	supports: {
		anchor: true,
	},
	attributes: {
		attr: {
			type: 'string',
			default: '',
		},
	},
	getEditWrapperProps: function () {
		return {
			'data-align': 'wide',
		};
	},
	edit: props => {
		const {attributes, setAttributes} = props;

		return (
			<div>
				<TextControl
					label="Attr"
					help=""
					value={attributes.attr}
					onChange={attr => {
						setAttributes({attr: attr});
					}}
				/>
			</div>
		);
	},
	save: props => {
		return null;
	},
});
