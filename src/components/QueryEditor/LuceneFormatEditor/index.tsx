import { Button, InlineField, Input, Segment, SegmentAsync } from '@grafana/ui';
import { css } from '@emotion/css';
import React from 'react';
import { useDatasource } from '../OpenSearchQueryContext';
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
export const FiltersLogsEditor = ({ part }: any) => {
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
  let value = {
    settings: { filters: [{ query: "query", label: "label" }] }
  }
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

  // @ts-ignore
  const toOptions = (m: string[]): Array<SelectableValue<string>> => m.map(convertSelectableValue);

  return (
    <>
      <div
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >
        {value.settings?.filters!.map((filter, index) => (
          <div
            key={index}
            className={css`
              display: flex;
            `}
          >
            <div
              className={css`
                width: 250px;
              `}
            >
              <InlineField label="Fields" labelWidth={10}>
                <SegmentAsync
                  className={"h"}
                  loadOptions={getFields}
                  onChange={() => { }}
                  placeholder="Select Field"
                  value={() => { }}
                />
              </InlineField>
            </div>
            <InlineField label="Operator" labelWidth={10}>
              <Segment
                className={"h"}
                options={toOptions(["a", "b"])}

                onChange={() => { }}
                placeholder="Select Field"
                value={() => { }}
              />
            </InlineField>
            <InlineField label="Value" labelWidth={10}>
              <Input
                placeholder="Value"
                onBlur={() => { }}
                defaultValue={filter.label}
              />
            </InlineField>
            <InlineField><Button /></InlineField>
          </div>
        ))}
      </div>
    </>
  );
};
