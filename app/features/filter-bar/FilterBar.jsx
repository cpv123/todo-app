import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import TagsList from './presentational/TagsList.jsx';
import PriorityFilters from './presentational/PriorityFilters.jsx';
import { sortTodos } from '../../actions/sortTodos_actions';
import { filterTodos } from '../../actions/filterTodos_actions';
import AddButton from '../form/presentational/AddButton.jsx';
import { GET_TODOS_SORTED_BEGIN } from '../../actions/types';

class FilterBar extends Component {

  onSortTodos = () => {
    this.props.sortTodos();
  }

  onFilterTodos = (event) => {
    this.props.filterTodos(event);
  }

  render() {
    const { todos, tags } = this.props;
    const remainingTodos = Object.keys(todos).filter(key => !todos[key].complete);
    return (
      <div>
        <p>
          {remainingTodos.length}
          {' '}
          items remaining
        </p>
        <p>
          Filter by
        </p>
        <div style={{ 'display': 'flex', 'alignItems': 'flex-end' }}>
            <IconButton onClick={this.onSortTodos}>
                <FilterListIcon />
            </IconButton>
            <p>complete</p>
        </div>
        <PriorityFilters 
            onSelectPriority={this.onFilterTodos}
            todos={todos}
            remainingTodos={remainingTodos} />
        <TagsList tags={tags}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
    return { 
        todos: state.todos.todos,
        tags: state.tags.tags,
    };
}

export default connect(mapStateToProps, {
    sortTodos,
    filterTodos,
})(FilterBar);