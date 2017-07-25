import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';

import { WidgetsTableContainer } from './widgets-table';

export class HomePage extends React.Component {

  render() {
    return <section>
      <QueryRenderer
        environment={environment}
        query={graphql`
          query homePageQuery {
            viewer {
              id
              ...widgetsTable_viewer
            }
          }
        `}
        variables={{}}
        render={({ error, props, retry }) => {
          if (error) {
            console.log(error);
            return <div>
              <h1>Error Loading</h1>
              <button type="button" onClick={() => retry()}>Retry</button>
            </div>;
          } else if (props) {
            return <div>              
              <WidgetsTableContainer viewer={props.viewer} />
            </div>;
          } else {
            return <div>Loading Home Page...</div>;
          }
        }}
      />
    </section>;
  }

}