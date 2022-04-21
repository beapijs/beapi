// Normal imports.
import { register, RegistrationBuilder, Test } from 'mojang-gametest'

// Type imports.
import type { Client, RegisteredTest } from '..'

/**
 * Test Manager is the primary interaction point gametest
 * methods that had no other categorization placing.
 */
export class TestManager {
  /**
   * Private client reference.
   */
  protected readonly _client: Client

  protected readonly _tests = new Map<string, RegisteredTest>()

  /**
   * Test Manager is the primary interaction point gametest
   * methods that had no other categorization placing.
   * @param {Client} client
   */
  public constructor(client: Client) {
    // Assign private client reference.
    this._client = client
  }

  /**
   * Register test.
   * @param {string} testClass Name of the test class.
   * @param {string} testName Name of the test.
   * @param callback Result of the test.
   * @returns {RegistrationBuilder}
   */
  public registerTest(testClass: string, testName: string, callback: (data: Test) => void): RegistrationBuilder {
    this._tests.set(`${testClass}:${testName}`, {
      class: testClass,
      name: testName,
      callback,
    })

    return register(testClass, testName, callback)
  }

  /**
   * Get all registered tests.
   * @returns {Map<string, RegisteredTest>} All registered tests.
   */
  public getAll(): Map<string, RegisteredTest> {
    return this._tests
  }
}
