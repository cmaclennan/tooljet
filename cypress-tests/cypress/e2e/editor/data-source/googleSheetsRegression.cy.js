import { postgreSqlSelector } from "Selectors/postgreSql";
import { postgreSqlText } from "Texts/postgreSql";

import { commonSelectors, commonWidgetSelector } from "Selectors/common";
import { commonWidgetText } from "Texts/common";
import {} from "Support/utils/commonWidget";
import { selectColourFromColourPicker } from "../../../support/utils/commonWidget";
import {
  addQuery,
  fillDataSourceTextField,
  fillConnectionForm,
  selectDataSource,
  openQueryEditor,
  selectQueryMode,
  addGuiQuery,
  addWidgetsToAddUser,
} from "Support/utils/postgreSql";

describe("Editor- Test Button widget", () => {
  const data = {};
  data.sheetId = "123";
  data.range = "A1:Z100";
  data.gid = "1GYSTLiHKhLatsSN6768VgseLCvLu4sJhgGI9xek8WwM";
  beforeEach(() => {
    cy.appUILogin();
    cy.createApp();
  });

  it("should verify elements on connection form", () => {
    cy.get(postgreSqlSelector.leftSidebarDatasourceButton).click();
    cy.get(postgreSqlSelector.addDatasourceLink)
      .should("have.text", postgreSqlText.labelAddDataSource)
      .click();
    cy.get(postgreSqlSelector.dataSourceSearchInputField).type("Google Sheets");
    cy.get("[data-cy='data-source-google sheets']").click();

    cy.get(
      '[data-cy="google-sheet-connection-form-header"]'
    ).verifyVisibleElement("have.text", "Authorize");
    cy.get(
      '[data-cy="google-sheet-connection-form-description"]'
    ).verifyVisibleElement(
      "have.text",
      "If you want your ToolJet apps to modify your Google sheets, make sure to select read and write access"
    );

    cy.get('[data-cy="read-only-input"]');
    cy.get('[data-cy="read-only-label"]').verifyVisibleElement(
      "have.text",
      "Read only Your ToolJet apps can only read data from Google sheets"
    );
    cy.get('[data-cy="read-only-sub-label"]').verifyVisibleElement(
      "have.text",
      "Your ToolJet apps can only read data from Google sheets"
    );

    cy.get('[data-cy="read-and-write-input"]');
    cy.get('[data-cy="read-and-write-label"]').verifyVisibleElement(
      "have.text",
      "Read and write Your ToolJet apps can read data from sheets, modify sheets, and more."
    );
    cy.get('[data-cy="read-and-write-sub-label"]').verifyVisibleElement(
      "have.text",
      "Your ToolJet apps can read data from sheets, modify sheets, and more."
    );
  });
  it("should verify connection", () => {});
  it("should verify elements on query manager", () => {
    cy.visit("http://localhost:8082/apps/788123b1-1c5f-476a-8085-91e5f7e1e086");
    openQueryEditor("Google Sheets");
    cy.get('[class="query-pane"]').invoke("css", "height", "calc(85%)");

    selectQueryMode("Read data from a spreadsheet");
    cy.get('[data-cy="label-spreadsheet-id"]').verifyVisibleElement(
      "have.text",
      "Spreadsheet ID"
    );
    cy.get('[data-cy="spreadsheet_id-input-field"]').should("be.visible");

    cy.get('[data-cy="label-range"]').verifyVisibleElement(
      "have.text",
      "Range"
    );
    cy.get('[data-cy="spreadsheet_range-input-field"]').should("be.visible");

    cy.get('[data-cy="label-sheet"]').verifyVisibleElement(
      "have.text",
      "Sheet"
    );
    cy.get('[data-cy="sheet-input-field"]').should("be.visible");

    cy.wait(5000);
    selectQueryMode("Append data to a spreadsheet");
    cy.get('[data-cy="label-spreadsheet-id"]').verifyVisibleElement(
      "have.text",
      "Spreadsheet ID"
    );
    cy.get('[data-cy="spreadsheet_id-input-field"]').should("be.visible");

    cy.get('[data-cy="label-sheet"]').verifyVisibleElement(
      "have.text",
      "Sheet"
    );
    cy.get('[data-cy="sheet-input-field"]').should("be.visible");

    cy.get('[data-cy="label-rows"]').verifyVisibleElement("have.text", "Rows");
    cy.get('[data-cy="rows-input-field"]').should("be.visible");

    cy.wait(5000);
    selectQueryMode("Get spreadsheet info");
    cy.get('[data-cy="label-spreadsheet-id"]').verifyVisibleElement(
      "have.text",
      "Spreadsheet ID"
    );
    cy.get('[data-cy="spreadsheet_id-input-field"]').should("be.visible");

    cy.wait(5000);
    selectQueryMode("Update data to a spreadsheet");
    cy.get('[data-cy="label-spreadsheet-id"]').verifyVisibleElement(
      "have.text",
      "Spreadsheet ID"
    );
    cy.get('[data-cy="spreadsheet_id-input-field"]').should("be.visible");

    cy.get('[data-cy="label-range"]').verifyVisibleElement(
      "have.text",
      "Range"
    );
    cy.get('[data-cy="spreadsheet_range-input-field"]').should("be.visible");

    cy.get('[data-cy="label-sheet-name"]').verifyVisibleElement(
      "have.text",
      "Sheet name"
    );
    cy.get('[data-cy="sheet-input-field"]').should("be.visible");

    cy.get('[data-cy="label-where"]').verifyVisibleElement(
      "have.text",
      "Where"
    );
    cy.get('[data-cy="where_field-input-field"]').should("be.visible");

    cy.get('[data-cy="label-operator"]').verifyVisibleElement(
      "have.text",
      "Operator"
    );
    cy.get('[data-cy="where_field-input-field"]').should("be.visible");

    cy.get('[data-cy="label-value"]').verifyVisibleElement(
      "have.text",
      "Value"
    );
    cy.get('[data-cy="where_value-input-field"]').should("be.visible");

    cy.get('[data-cy="label-body"]').verifyVisibleElement("have.text", "Body");
    cy.get('[data-cy="body-input-field"]').should("be.visible");

    cy.wait(5000);
    selectQueryMode("Delete row from a spreadsheet");
    cy.get('[data-cy="label-spreadsheet-id"]').verifyVisibleElement(
      "have.text",
      "Spreadsheet ID"
    );
    cy.get('[data-cy="spreadsheet_id-input-field"]').should("be.visible");

    cy.get('[data-cy="label-gid"]').verifyVisibleElement("have.text", "GID");
    cy.get('[data-cy="sheet-input-field"]').should("be.visible");

    cy.get('[data-cy="label-delete-row-number"]').verifyVisibleElement(
      "have.text",
      "Delete row number"
    );
    cy.get('[data-cy="row_index-input-field"]').should("be.visible");
    cy.wait(5000);
  });
  it.only("should verify CURD operation on query", () => {
    cy.visit("http://localhost:8082/apps/788123b1-1c5f-476a-8085-91e5f7e1e086");
    openQueryEditor("Google Sheets");
    cy.get('[class="query-pane"]').invoke("css", "height", "calc(85%)");

    selectQueryMode("Read data from a spreadsheet");
    cy.get('[data-cy="spreadsheet_id-input-field"]').clearAndTypeOnCodeMirror(
      data.sheetId
    );
    cy.get(
      '[data-cy="spreadsheet_range-input-field"]'
    ).clearAndTypeOnCodeMirror(data.range);
    cy.get('[data-cy="sheet-input-field"]'); // only needed for two pages/sheets
    cy.get('[data-cy="query-create-and-run-button"]').click();

    openQueryEditor("Google Sheets");
    selectQueryMode("Append data to a spreadsheet");

    cy.get('[data-cy="spreadsheet_id-input-field"]').clearAndTypeOnCodeMirror(
      data.sheetId
    );
    cy.get('[data-cy="sheet-input-field"]');
    cy.get('[data-cy="rows-input-field"]').clearAndTypeOnCodeMirror(
      `[{"name":"mike", "email":"mike@example.com"},{"name":"mike1", "email":"mike1@example.com"},{"name":"mike2", "email":"mike2@example.com"}]`
    );
    cy.get('[data-cy="query-create-and-run-button"]').click();

    openQueryEditor("Google Sheets");
    selectQueryMode("Get spreadsheet info");
    cy.get('[data-cy="spreadsheet_id-input-field"]').clearAndTypeOnCodeMirror(
      data.sheetId
    );
    cy.get('[data-cy="query-create-and-run-button"]').click();

    openQueryEditor("Google Sheets");
    selectQueryMode("Update data to a spreadsheet");

    cy.get('[data-cy="spreadsheet_id-input-field"]').clearAndTypeOnCodeMirror(
      data.sheetId
    );
    cy.get(
      '[data-cy="spreadsheet_range-input-field"]'
    ).clearAndTypeOnCodeMirror(data.range);

    cy.get('[data-cy="sheet-input-field"]');

    cy.get('[data-cy="where_field-input-field"]').clearAndTypeOnCodeMirror(
      "name"
    );

    cy.get('[data-cy="where_value-input-field"]').clearAndTypeOnCodeMirror(
      "Mike"
    );
    cy.get('[data-cy="body-input-field"]').clearAndTypeOnCodeMirror(
      `{{({"email":"steph@example.com"})`
    );
    cy.get('[data-cy="query-create-and-run-button"]').click();

    openQueryEditor("Google Sheets");
    selectQueryMode("Delete row from a spreadsheet");

    cy.get('[data-cy="spreadsheet_id-input-field"]').clearAndTypeOnCodeMirror(
      data.sheetId
    );
    cy.get('[data-cy="sheet-input-field"]').clearAndTypeOnCodeMirror("0");
    cy.get('[data-cy="row_index-input-field"]').clearAndTypeOnCodeMirror("4");
    cy.get('[data-cy="query-create-and-run-button"]').click();
  });
  it("should verify the preview", () => {});
});
