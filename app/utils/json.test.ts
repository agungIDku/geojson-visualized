import { isJsonString, jsonReader } from "./json";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("isJsonString", () => {
  it("should return true for valid JSON string", () => {
    expect(isJsonString('{"name":"John", "age":30, "city":"New York"}')).toBe(
      true
    );
  });

  it("should return false for invalid JSON string", () => {
    expect(isJsonString('{"name": "John", "age": 30, "city": "New York"')).toBe(
      false
    );
  });
});

describe("jsonReader", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("reads and parses valid JSON file", async () => {
    const file = new File([JSON.stringify({ key: "value" })], "test.json", {
      type: "application/json",
    });
    const callback = jest.fn();

    // Create mock FileReader and its methods
    const mockFileReaderInstance = {
      onload: jest.fn(),
      onerror: jest.fn(),
      readAsText: jest.fn(),
    };

    global.FileReader = jest.fn(() => mockFileReaderInstance) as any;

    jsonReader(file, callback);

    // Simulate onload event
    mockFileReaderInstance.onload({
      target: { result: JSON.stringify({ key: "value" }) },
    });

    await Promise.resolve(); // Wait for the promise chain to resolve

    expect(callback).toHaveBeenCalledWith({ key: "value" });
    expect(mockFileReaderInstance.readAsText).toHaveBeenCalledWith(file);
    expect(mockFileReaderInstance.onerror).not.toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });

  test("handles invalid JSON file", async () => {
    const file = new File(["invalid JSON"], "test.json", {
      type: "application/json",
    });
    const callback = jest.fn();

    // Create mock FileReader and its methods
    const mockFileReaderInstance = {
      onload: jest.fn(),
      onerror: jest.fn(),
      readAsText: jest.fn(),
    };

    global.FileReader = jest.fn(() => mockFileReaderInstance) as any;

    jsonReader(file, callback);

    // Simulate onload event with invalid JSON
    mockFileReaderInstance.onload({ target: { result: "invalid JSON" } });

    await Promise.resolve(); // Wait for the promise chain to resolve

    expect(callback).not.toHaveBeenCalled();
    expect(mockFileReaderInstance.readAsText).toHaveBeenCalledWith(file);
    expect(mockFileReaderInstance.onerror).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalled();
  });
});
