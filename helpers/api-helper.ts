import {APIRequestContext, APIResponse, expect} from '@playwright/test';

export async function getPage(
  request: APIRequestContext,
  path: string,
): Promise<APIResponse> {
  return request.get(path);
}

export async function assertStatus(
  response: APIResponse,
  expectedStatus: number,
): Promise<void> {
  expect(response.status()).toBe(expectedStatus);
}

export async function assertContentType(
  response: APIResponse,
  expectedType: string,
): Promise<void> {
  const contentType = response.headers()['content-type'];
  expect(contentType).toContain(expectedType);
}

export async function assertBodyContains(
  response: APIResponse,
  text: string,
): Promise<void> {
  const body = await response.text();
  expect(body).toContain(text);
}
