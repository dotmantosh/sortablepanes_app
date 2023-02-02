import React, { useState, useEffect } from "react";
import { SortablePane, Pane } from "react-sortable-pane";
import DataService from "../services/DataService";

function SimpleUncontrolledExample() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await DataService.getData();
    console.log(res.data);
    setData(res.data);
  };

  const panes = ["a", "b", "c"].map((item, key) => (
    <Pane key={key} defaultSize={{ width: "100%", height: 120 }}>
      00{item}
      {key}
    </Pane>
  ));
  return (
    <div>
      <SortablePane
        direction="vertical"
        margin={20}
        defaultOrder={["0", "1", "2"]}
      >
        {panes}
      </SortablePane>
    </div>
  );
}

export default SimpleUncontrolledExample;
