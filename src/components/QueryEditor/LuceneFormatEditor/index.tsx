import { IconButton, InlineField, Segment, SegmentAsync } from '@grafana/ui';
import { css } from '@emotion/css';
import React from 'react';
import { useDatasource } from '../OpenSearchQueryContext';
import { useDispatch } from 'hooks/useStatelessReducer';
import { addFieldName, addFilterLucene, addFilterOperator, addFilterValue } from './state';
import { OpenSearchQuery } from 'types';
import { segmentStyles } from '../styles';
import { getFilterLucene } from './LuceneEditor';
interface Props {
  value: OpenSearchQuery;
}
// import { AddRemove } from '../../../../AddRemove';
// import { useDispatch, useStatelessReducer } from '../../../../../hooks/useStatelessReducer';
// import { Filters } from '../../aggregations';
// import { changeBucketAggregationSetting } from '../../state/actions';
// import { BucketAggregationAction } from '../../state/types';
// import { addFilter, changeFilter, removeFilter } from './state/actions';
// import { reducer as filtersReducer } from './state/reducer';

// interface Props {
//   value: Filters;
// }
// { useEffect }
export const FiltersLogsEditor = ({ value }: Props) => {
  //   const upperStateDispatch = useDispatch<BucketAggregationAction<Filters>>();

  //   const dispatch = useStatelessReducer(
  //     newState => upperStateDispatch(changeBucketAggregationSetting(value, 'filters', newState)),
  //     value.settings?.filters,
  //     filtersReducer
  //   );

  // The model might not have filters (or an empty array of filters) in it because of the way it was built in previous versions of the datasource.
  // If this is the case we add a default one.
  //   useEffect(() => {
  //     if (!value.settings?.filters?.length) {
  //       dispatch(addFilter());
  //     }
  //   }, []);
  // let value = {
  //   settings: { filters: [{ query: "query", label: "label" }] }
  // }
  const datasource = useDatasource();

  // @ts-ignore
  const toSelectableValue = ({ value, text }: MetricFindValue): SelectableValue<string> => ({
    label: text,
    value: `${value || text}`,
  });

  // @ts-ignore
  const convertSelectableValue = (text: string): SelectableValue<string> => ({
    label: text,
    value: text,
  });

  // TODO: Move this in a separate hook (and simplify)
  const getFields = async () => {
    const get = () => {
      return datasource.getFields();
    }
    return (await get()).map(toSelectableValue);
  };

  const getValues = async () => {
    const get = () => {
      return datasource.getFieldsSuggestor({ field: value.filter?.field, queryString: "" })
    }
    return (await get()).map(toSelectableValue);
  }

  // console.log(datasource.getFieldsSuggestor({ field: "app_name.keyword", queryString: "a" }))

  // @ts-ignore
  const toOptions = (m: string[]): Array<SelectableValue<string>> => m.map(convertSelectableValue);

  const dispatch = useDispatch();
  console.log(value)

  return (
    <>
      <div
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >

        <div
          className={css`
              display: flex;
            `}
        >

          <SegmentAsync
            className={segmentStyles}
            loadOptions={getFields}
            onChange={(e) => { dispatch(addFieldName(e.value)) }}
            placeholder="Select Field Name"
            value={value.filter?.field}
          />
          <Segment
            className={segmentStyles}
            options={toOptions(["is", "is not", "exists", "does not exist"])}
            onChange={(e) => { dispatch(addFilterOperator(e.label)) }}
            placeholder="Operator"
            value={value.filter?.operator}
          />
          <SegmentAsync
            className={segmentStyles}
            loadOptions={getValues}
            onChange={e => dispatch(addFilterValue(e.value))}
            placeholder="Field Value"
            value={value.filter?.value}
          />
          <InlineField>
            <IconButton
              name="plus"
              size="lg"
              variant='secondary'
              aria-label="Add"
              onClick={() => dispatch(addFilterLucene(getFilterLucene(value.filter?.field, value.filter?.operator, value.filter?.value, value.query)))}
            /></InlineField>
        </div>
      </div>
    </>
  );
};


