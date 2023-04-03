import { Action } from '../../../hooks/useStatelessReducer';
import { INIT } from '../state';

export const ADD_FIELD_NAME_FILTER = 'add_field_name_filter';
export const ADD_FILTER_OPERATOR = 'add_filter_operator';
export const ADD_FILTER_VALUE = 'add_filter_value';
export const ADD_FILTER_LUCENE = 'add_filter_lucene';

export interface FilterVariable {
    field: string;
    operator: string;
    value: string;
}

export interface AddFieldNameFilter extends Action<typeof ADD_FIELD_NAME_FILTER> {
    payload: {
        field: string;
    };
}

export interface AddFilterOperator extends Action<typeof ADD_FILTER_OPERATOR> {
    payload: {
        operator: string;
    };
}

export interface AddFilterValue extends Action<typeof ADD_FILTER_VALUE> {
    payload: {
        value: string;
    };
}

export interface AddFilterLucene extends Action<typeof ADD_FILTER_LUCENE> {
    payload: {
        field: string
        operator: string
        value: string
        query: string
    };
}

export interface InitAction extends Action<typeof INIT> {}

export function addFieldName(value: string): AddFieldNameFilter {
    return {
        type: ADD_FIELD_NAME_FILTER,
        payload: {
            field: value,
        },
    }
}


export const addFilterOperator = (value: string): AddFilterOperator => (

    {
        type: ADD_FILTER_OPERATOR,
        payload: {
            operator: value,
        },
    });


export const addFilterValue = (value: string): AddFilterValue => (

    {
        type: ADD_FILTER_VALUE,
        payload: {
            value: value,
        },
    });


    export const addFilterLucene = (value: string): AddFilterLucene => (

        {
            type: ADD_FILTER_LUCENE,
            payload: {
                field: "",
                operator: "",
                value: "",
                query: value
            },
        });

export type FilterActions =
    | AddFieldNameFilter
    | AddFilterOperator
    | AddFilterValue
    | AddFilterLucene
    | InitAction


export const LuceneFormatEditorReducer = (state: FilterVariable, action: FilterActions) => {
    switch (action.type) {
        case INIT:
            return {
                field: "",
                operator: "",
                value: ""
            }
        case ADD_FIELD_NAME_FILTER:
            return {
                ...state,
                field: action.payload.field
            }
        case ADD_FILTER_OPERATOR:
            return {
                ...state,
                operator: action.payload.operator
            }
        case ADD_FILTER_VALUE:
            return {
                ...state,
                value: action.payload.value
            }
        case ADD_FILTER_LUCENE:
            return {
                field: action.payload.field,
                operator: action.payload.operator,
                value: action.payload.value
            }
        default:
            return state
    }
};
