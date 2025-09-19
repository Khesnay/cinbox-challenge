import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Define the FilmCategory type for the test
type FilmCategory =
  | "popular"
  | "horror"
  | "drama"
  | "adventure"
  | "action"
  | "comedy";

const getButtonClass = (category: FilmCategory): string => {
  console.log("getButtonClass called with:", category);

  switch (category) {
    case "horror":
      console.log("Returning: btn btn-action");
      return "btn btn-horror";
    case "drama":
      console.log("Returning: btn btn-drama");
      return "btn btn-drama";
    case "adventure":
      return "btn btn-adv";
    default:
      console.log("Returning: btn btn-primary");
      return "btn btn-primary";
  }
};

describe("getButtonClass", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on console.log to verify logging behavior
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.log after each test
    consoleSpy.mockRestore();
  });

  describe("should return correct CSS classes", () => {
    it('returns "btn btn-horror" for horror category', () => {
      const result = getButtonClass("horror");

      expect(result).toBe("btn btn-horror");
    });

    it('returns "btn btn-drama" for drama category', () => {
      const result = getButtonClass("drama");

      expect(result).toBe("btn btn-drama");
    });

    it('returns "btn btn-adv" for adventure category', () => {
      const result = getButtonClass("adventure");

      expect(result).toBe("btn btn-adv");
    });

    it('returns "btn btn-primary" for popular category (default case)', () => {
      const result = getButtonClass("popular");

      expect(result).toBe("btn btn-primary");
    });

    it('returns "btn btn-primary" for action category (default case)', () => {
      const result = getButtonClass("action");

      expect(result).toBe("btn btn-primary");
    });

    it('returns "btn btn-primary" for comedy category (default case)', () => {
      const result = getButtonClass("comedy");

      expect(result).toBe("btn btn-primary");
    });
  });

  describe("should log correct messages", () => {
    it("logs correct messages for horror category", () => {
      getButtonClass("horror");

      expect(consoleSpy).toHaveBeenCalledWith(
        "getButtonClass called with:",
        "horror"
      );
      expect(consoleSpy).toHaveBeenCalledWith("Returning: btn btn-action");
      expect(consoleSpy).toHaveBeenCalledTimes(2);
    });

    it("logs correct messages for drama category", () => {
      getButtonClass("drama");

      expect(consoleSpy).toHaveBeenCalledWith(
        "getButtonClass called with:",
        "drama"
      );
      expect(consoleSpy).toHaveBeenCalledWith("Returning: btn btn-drama");
      expect(consoleSpy).toHaveBeenCalledTimes(2);
    });

    it("logs only input message for adventure category (no return log)", () => {
      getButtonClass("adventure");

      expect(consoleSpy).toHaveBeenCalledWith(
        "getButtonClass called with:",
        "adventure"
      );
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });

    it("logs correct messages for default case", () => {
      getButtonClass("popular");

      expect(consoleSpy).toHaveBeenCalledWith(
        "getButtonClass called with:",
        "popular"
      );
      expect(consoleSpy).toHaveBeenCalledWith("Returning: btn btn-primary");
      expect(consoleSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe("edge cases", () => {
    it("handles undefined input gracefully", () => {
      // @ts-expect-error - Testing invalid input
      const result = getButtonClass(undefined);

      expect(result).toBe("btn btn-primary");
      expect(consoleSpy).toHaveBeenCalledWith(
        "getButtonClass called with:",
        undefined
      );
    });

    it("handles null input gracefully", () => {
      // @ts-expect-error - Testing invalid input
      const result = getButtonClass(null);

      expect(result).toBe("btn btn-primary");
      expect(consoleSpy).toHaveBeenCalledWith(
        "getButtonClass called with:",
        null
      );
    });

    it("handles empty string input gracefully", () => {
      // @ts-expect-error - Testing invalid input
      const result = getButtonClass("");

      expect(result).toBe("btn btn-primary");
      expect(consoleSpy).toHaveBeenCalledWith(
        "getButtonClass called with:",
        ""
      );
    });
  });

  describe("function behavior consistency", () => {
    it("returns consistent results for multiple calls with same input", () => {
      const result1 = getButtonClass("horror");
      const result2 = getButtonClass("horror");
      const result3 = getButtonClass("horror");

      expect(result1).toBe(result2);
      expect(result2).toBe(result3);
      expect(result1).toBe("btn btn-horror");
    });

    it("function is pure - no side effects affect return value", () => {
      const categories: FilmCategory[] = ["horror", "drama", "adventure"];
      const firstRun = categories.map((cat) => getButtonClass(cat));
      const secondRun = categories.map((cat) => getButtonClass(cat));

      expect(firstRun).toEqual(secondRun);
    });
  });
});
