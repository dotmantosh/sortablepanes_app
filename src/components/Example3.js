import * as React from "react";
import { SortablePane, Pane } from "react-sortable-pane";

export default class SimpleControlledFullExample extends React.Component {
  state = {
    order: ["2", "1", "0"],
    panes: { 0: { height: 100 }, 1: { height: 200 }, 2: { height: 300 } },
  };

  render() {
    const panes = [0, 1, 2].map((key) => (
      <Pane
        key={key}
        size={{ width: "100%", height: this.state.panes[key].height }}
      >
        00{key}
      </Pane>
    ));
    return (
      <div style={{ width: "100px" }}>
        <SortablePane
          direction="vertical"
          margin={20}
          order={this.state.order}
          onOrderChange={(order) => {
            this.setState({ order });
          }}
          onResizeStop={(e, key, dir, ref, d) => {
            console.log(e);
            console.log(key);
            console.log(dir);
            console.log(ref);
            console.log(d);
            /* this.setState({
              panes: {
                ...this.state.panes,
                [key]: { height: this.state.panes[key].height + d.height },
              },
            }); */
          }}
          onResize={(e, key, dir, ref, d) => {
            console.log(e);
            console.log(key);
            console.log(dir);
            console.log(ref);
            console.log(d);
            /*  this.setState({
              panes: {
                ...this.state.panes,
                [key]: { height: this.state.panes[key].height + d },
              },
            }); */
          }}
          onResizeStart={(e, key, dir, ref, d) => {
            console.log(e);
            console.log(key);
            console.log(dir);
            console.log(ref);
            console.log(d);
            /* this.setState({
              panes: {
                ...this.state.panes,
                [key]: { height: this.state.panes[key].height + d.height },
              },
            }); */
          }}
        >
          {panes}
        </SortablePane>
      </div>
    );
  }
}
