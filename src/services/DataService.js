import Api from "../services/Api";

const DataService = {
  getData() {
    return Api().get("/api/data");
  },
  addNewPaneGroup(data) {
    return Api().post("/api/data", data);
  },
  duplicatePane(paneId, indexOfOrder) {
    return Api().post(`/api/data/pane/${paneId}?indexOfOrder=${indexOfOrder}`);
  },
};

export default DataService;
