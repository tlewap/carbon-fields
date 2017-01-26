/**
 * The external dependencies.
 */
import React, { PropTypes } from 'react';
import { compose, withState, withProps } from 'recompose';

/**
 * The internal dependencies.
 */
import Field from 'fields/components/field';
import AssociationSearch from 'fields/components/association-search';
import AssociationList from 'fields/components/association-list';

import withStore from 'fields/decorators/with-store';
import withSetup from 'fields/decorators/with-setup';

/**
 * Render a field that allows to create links between posts, taxonomy terms,
 * users or comments.
 *
 * @param  {Object}   props
 * @param  {String}   props.name
 * @param  {Object}   props.field
 * @param  {String}   props.term
 * @param  {Object[]} props.items
 * @param  {Function} props.setTerm
 * @return {React.Element}
 *
 * TODO: Fix the translation of the labels.
 * TODO: Research more about `react-virtualized`.
 * 		 Probably can improve the performance on very long lists.
 */
export const AssociationField = ({ name, field, term, items, setTerm }) => {
	return <Field field={field}>
		<div className="carbon-relationship-container carbon-Relationship">
			<div className="selected-items-container">
				<strong>
					<span className="selected-counter">{field.value.length}</span>

					<span className="selected-label">
						{
							field.value.length !== 1
							? ' selected items'
							: ' selected item'
						}
					</span>

					{
						field.max !== -1
						? <span className="remaining"> out of {field.max}</span>
						: null
					}
				</strong>
			</div>

			<AssociationSearch
				term={term}
				onChange={setTerm} />

			<div className="carbon-relationship-body">
				<div className="carbon-relationship-left">
					<AssociationList items={items} />
				</div>

				<div className="carbon-relationship-right">
					<label>Associated:</label>

					<AssociationList items={field.value} />
				</div>
			</div>
		</div>
	</Field>;
};

/**
 * The additional props that will be passed to the component.
 *
 * @param  {Object} props
 * @param  {Object} props.field
 * @param  {String} props.term
 * @return {Object}
 */
const props = ({ field, term }) => {
	let items = field.options;

	if (term) {
		items = items.filter(({ title }) => title.toLowerCase().includes(term.toLowerCase()));
	}

	return {
		items,
	};
};

export default compose(
	withStore(),
	withSetup(),
	withState('term', 'setTerm', ''),
	withProps(props)
)(AssociationField);
