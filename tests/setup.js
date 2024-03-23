import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import mockAxios from "vitest-mock-axios";
afterEach(() => {
	cleanup();
	mockAxios.reset();
});
