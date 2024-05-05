import { act } from "react";
import { useGeoStore } from "./geo";

describe("useGeoStore", () => {
  it("should initialize with null data", () => {
    const { data } = useGeoStore.getState();
    expect(data).toBeNull();
  });

  it("should allow data to be set", () => {
    const testGeoData = { type: "Point", coordinates: [100.0, 0.0] };
    act(() => {
      useGeoStore.getState().setData(testGeoData as any);
    });
    const { data } = useGeoStore.getState();
    expect(data).toEqual(testGeoData);
  });

  it("should clear data", () => {
    act(() => {
      useGeoStore.getState().setData({
        type: "LineString",
        coordinates: [
          [100.0, 0.0],
          [101.0, 1.0],
        ],
      });
      useGeoStore.getState().clearData();
    });
    const { data } = useGeoStore.getState();
    expect(data).toBeNull();
  });
});
