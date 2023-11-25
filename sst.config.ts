import { SSTConfig } from "sst";
import { API } from "./stacks/JobseekerStack";

export default {
  config(_input) {
    return {
      name: "jobseeker",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
