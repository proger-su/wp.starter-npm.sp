const { IconButton, Button } = wp.components;

export default class Repeater extends React.Component {
	constructor(props) {
		super(...arguments);

		this.props = props;
		this.attributes = props.attributes;

		// Parse block attributes if there are any reviews already
		let items;
		try {
			const parsed = JSON.parse(this.props.attributes[this.props.attributeName]);
			items = Array.isArray(parsed) ? parsed : [{}];
		} catch (e) {
			items = [{}];
		}

		// Set Reviews in component state
		this.state = {
			items,
		};
	}

	onItemAdd = () => {
		let items = this.state.items;
		items.push({});
		this.updateItems(items);
	};

	onItemRemove = index => {
		if (!confirm(`Are you sure you want to delete the ${this.props.itemLabel}?`)) {
			return false;
		}

		let items = this.state.items;

		// prevent deletng if already 0 reviews
		if (items.length === 0) {
			return false;
		}

		// delete the review under index
		items.splice(index, 1);
		this.updateItems(items);
	};

	updateItemField = (newVal, index, field) => {
		let items = this.state.items;
		items[index][field] = newVal;

		this.updateItems(items);
	};

	getItemField = (index, field) => {
		return this.state.items[index][field];
	};

	moveItem = (fromIndex, toIndex) => {
		let items = this.state.items;
		let item = items[fromIndex];
		items.splice(fromIndex, 1);
		items.splice(toIndex, 0, item);
		this.updateItems(items);
	};

	updateItems = items => {
		this.setState({ items });
		this.saveItemsToBlock();
	};

	saveItemsToBlock = () => {
		const { setAttributes } = this.props;
		let encodedItems =
			this.state.items !== null ? JSON.stringify(this.state.items) : JSON.stringify([]);
		setAttributes({ [this.props.attributeName]: encodedItems });
	};

	render() {
		return (
			<div className={"ma-repeater " + this.props.wrapClass}>
				{Object.keys(this.state.items).map((item, index) => {
					return (
						<>
							<div className="ma-row">
								<span>#{index + 1}</span>
								<span className="ma-row__actions">
									<IconButton
										icon="arrow-up-alt2"
										label={`Move ${this.props.itemLabel} up`}
										onClick={() => {
											this.moveItem(index, index - 1);
										}}
										disabled={index === 0}
									/>
									<IconButton
										icon="arrow-down-alt2"
										label={`Move ${this.props.itemLabel} down`}
										onClick={() => {
											this.moveItem(index, index + 1);
										}}
										disabled={index === this.state.items.length - 1}
									/>
									<IconButton
										icon="trash"
										label={`Delete ${this.props.itemLabel}`}
										onClick={() => {
											this.onItemRemove(index);
										}}
									/>
								</span>
							</div>
							<RepeaterRow
								index={index}
								onFieldChange={this.updateItemField}
								getFieldValue={this.getItemField}>
								{this.props.children}
							</RepeaterRow>
						</>
					);
				})}
				<div class="repeater-actions text-right">
					<Button isPrimary={true} label="" className={this.props.btnClass} onClick={this.onItemAdd}>
						{`Add ${this.props.itemLabel}`}
					</Button>
				</div>
			</div>
		);
	}
}

/**
 * Repeater Row Functional Component
 * @param {object} props
 */
const RepeaterRow = props => {
	const children = React.Children.map(props.children, child => {
		return React.cloneElement(child, {
			rowIndex: props.index,
			changeHandler: props.onFieldChange,
			getValue: props.getFieldValue,
		});
	});
	return <div className="ma-repeater__fields">{children}</div>;
};
