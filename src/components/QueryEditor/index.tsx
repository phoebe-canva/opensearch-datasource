import React, { useState } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { OpenSearchDatasource } from '../../datasource';
import { OpenSearchOptions, OpenSearchQuery, QueryType } from '../../types';
import { OpenSearchProvider } from './OpenSearchQueryContext';
import { Button, InlineField, InlineFieldRow, Input, Popover, QueryField } from '@grafana/ui';
import { changeAliasPattern, changeQuery } from './state';
import { QueryTypeEditor } from './QueryTypeEditor';
import { MetricAggregationsEditor } from './MetricAggregationsEditor';
import { BucketAggregationsEditor } from './BucketAggregationsEditor';
import { useDispatch } from '../../hooks/useStatelessReducer';
import { useNextId } from '../../hooks/useNextId';
import { css } from '@emotion/css';
import { PPLFormatEditor } from './PPLFormatEditor';

export type OpenSearchQueryEditorProps = QueryEditorProps<OpenSearchDatasource, OpenSearchQuery, OpenSearchOptions>;

export const QueryEditor = ({ query, onChange, datasource }: OpenSearchQueryEditorProps) => (
  <OpenSearchProvider datasource={datasource} onChange={onChange} query={query}>
    <QueryEditorForm value={query} />
  </OpenSearchProvider>
);

const styles = {
  queryWrapper: css`
    display: flex;
    flex-grow: 1;
  `,
};
interface Props {
  value: OpenSearchQuery;
}
export const QueryEditorForm = ({ value }: Props) => {
  const dispatch = useDispatch();
  const nextId = useNextId();
  // const [isModalOpen] = useState(true);

  return (
    <>
      <InlineFieldRow>
        <InlineField label="Query" labelWidth={17} grow>
          <div className={styles.queryWrapper}>
            <QueryTypeEditor value={value.queryType} />
            <QueryField
              query={value.query}
              // By default QueryField calls onChange if onBlur is not defined, this will trigger a rerender
              // And slate will claim the focus, making it impossible to leave the field.
              onBlur={() => { }}
              onChange={query => dispatch(changeQuery(query))}
              placeholder={value.queryType === QueryType.PPL ? 'PPL Query' : 'Lucene Query'}
              portalOrigin="opensearch"
            />
          </div>
        </InlineField>
        {value.queryType !== QueryType.PPL && (
          <InlineField label="Alias" labelWidth={15}>
            <Input
              placeholder="Alias Pattern"
              onBlur={e => dispatch(changeAliasPattern(e.currentTarget.value))}
              defaultValue={value.alias}
            />
          </InlineField>
        )}
      </InlineFieldRow>

      <InlineFieldRow>
        <InlineField label="Filter" labelWidth={17} id="popup-reference" grow>
          {/* <ColorPickerPopover
            color="#BC67E6"
            onChange={() => {
            }}
          ></ColorPickerPopover> */}
          {/* <div className={styles.queryWrapper}>
            <Segment
              className={segmentStyles}
              options=["is, is not"]
            onChange={e => dispatch(changeQueryType(e.value!))}
            value={toOption(value)}
    />
          </div> */}
          <div>hello</div>

        </InlineField>

      </InlineFieldRow>
      {/* <Modal title="text" isOpen={isModalOpen} >
        Trying to see if this works
      </Modal> */}
      <Popover show={true} referenceElement={document.getElementById('popup-reference')} content={<div>POP UP?</div>}>

        <Button>Open Form</Button>
      </Popover>

      {value.queryType === QueryType.PPL ? (
        <PPLFormatEditor />
      ) : (
        <>
          <MetricAggregationsEditor nextId={nextId} />
          <BucketAggregationsEditor nextId={nextId} />
        </>
      )}
    </>
  );
};
