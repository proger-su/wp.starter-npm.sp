const {DatePicker, TextareaControl, BaseControl, ToggleControl, SelectControl, Button, IconButton} = wp.components;
const {MediaUpload, MediaUploadCheck} = wp.blockEditor;
const {RichText} = wp.editor;
export const RepeaterField = props => {
	let field;
	if (props.control === 'toggle') {
		field = (
			<ToggleControl
				label={props.label}
				help={props.help}
				checked={props.getValue(props.rowIndex, props.field)}
				onChange={value => {
					props.changeHandler(value, props.rowIndex, props.field);
				}}
			/>
		);
	}
	if (props.control === 'text') {
		field = (
			<BaseControl
				label={props.label}
				hideLabelFromVision={props.hideLabelFromVision}
				id={`${props.rowIndex}-${props.field}`}
				help={props.help}
				className={props.className}
				{...props}>
				<input
					className="components-text-control__input"
					type={props.type}
					id={`${props.rowIndex}-${props.field}`}
					value={props.getValue(props.rowIndex, props.field)}
					onChange={ev => {
						props.changeHandler(ev.target.value, props.rowIndex, props.field);
					}}
					placeholder={props.placeholder}
					{...props}
				/>
			</BaseControl>
		);
	}
	if (props.control === 'date') {
		field = (
			<BaseControl className={props.className} label={props.label}>
				<DatePicker
					currentDate={props.getValue(props.rowIndex, props.field) || null}
					onChange={value => {
						props.changeHandler(value, props.rowIndex, props.field);
					}}
				/>
			</BaseControl>
		);
	}
	if (props.control === 'select') {
		field = (
			<BaseControl label={props.label} className={props.className}>
				<SelectControl
					value={props.getValue(props.rowIndex, props.field)}
					onChange={value => {
						props.changeHandler(value, props.rowIndex, props.field);
					}}
					options={[
						{value: '0', label: '0'},
						{value: '1', label: '1'},
						{value: '2', label: '2'},
						{value: '3', label: '3'},
						{value: '4', label: '4'},
						{value: '5', label: '5'},
					]}
				/>
			</BaseControl>
		);
	}
	if (props.control === 'media') {
		field = (
			<BaseControl className={props.className}>
				<MediaUploadCheck>
					<MediaUpload
						value={() => {
							let val = props.getValue(props.rowIndex, props.field) || {};

							if (val && val.id) {
								return val.id;
							}

							return '';
						}}
						onSelect={media => {
							props.changeHandler({
								id: media.id,
								thumb: media.sizes.thumbnail.url
							}, props.rowIndex, props.field);
						}}

						render={({open}) => {
							let media = props.getValue(props.rowIndex, props.field) || {};

							return (
								<div className="starter-image-button-wrap">
									<Button className={media.id ? 'starter-image-button' : 'button button-small'} onClick={open}>
										{!media.id ? props.label : <img src={media.thumb} alt={props.label}/>}
									</Button>
									{
										(media.id) ? (<IconButton
											className="starter-image-delete"
											icon="no-alt"
											label="Delete Image"
											onClick={() => {
												props.changeHandler('{}', props.rowIndex, props.field);
											}}
										/>) : null
									}
								</div>
							);
						}}

					/>
				</MediaUploadCheck>
			</BaseControl>
		);
	}
	if (props.control === 'textarea') {
		field = (
			<TextareaControl
				label={props.label}
				value={props.getValue(props.rowIndex, props.field)}
				rows="8"
				onChange={value => {
					props.changeHandler(value, props.rowIndex, props.field);
				}}
			/>
		);
	}
	if (props.control === 'richtext') {
		field = (
			<BaseControl label={props.label} className={props.className}>
				<RichText
					value={props.getValue(props.rowIndex, props.field)}
					onChange={value => {
						props.changeHandler(value, props.rowIndex, props.field);
					}}
					multiline={props.multiline}
					placeholder={props.placeholder}
				/>
			</BaseControl>
		);
	}

	return field;
};
