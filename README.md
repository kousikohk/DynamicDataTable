# DynamicDataTable

DynamicDataTable is a Lightning Web Component (LWC) that allows you to display a list of records in a dynamic data table with features like sorting, pagination, and inline editing. The component can be customized to work with any SObject type and is responsive and user-friendly.

## Features

- Dynamic display of records from any SObject
- Pagination for easy navigation through records
- Sorting by columns (e.g., Account Name, Industry, Annual Revenue)
- Inline editing of fields with save functionality
- Search feature to filter records by a field (e.g., Account Name)
- Works with any standard or custom Salesforce objects

## Installation

Follow these steps to install and deploy the `DynamicDataTable` component in your Salesforce org.

### Step 1: Install the Unmanaged Package

Click the link below to install the unmanaged package containing the `DynamicDataTable` component:

[Install DynamicDataTable Package](https://login.salesforce.com/packaging/installPackage.apexp?p0=04tdM00000059HB) V 1.0
(https://login.salesforce.com/packaging/installPackage.apexp?p0=04tdM00000059In) V 1.1
(https://login.salesforce.com/packaging/installPackage.apexp?p0=04tdM00000059ST) V 1.2

1. Log in to your Salesforce account.
2. Choose the environment you want to install the package into (Production or Sandbox).
3. Review the package details and click **Install**.
4. Choose the appropriate security settings for your users.
5. Click **Install** and wait for the package to finish installing.

### Step 2: Add the DynamicDataTable Component to a Page (It comes with a Page in which it is added by default, feel free to use the same page with API name Dynamic_Data_Table which can be accessed by assigning the logged in user the Dynamic Datatable Permission Set)

Once the package is installed, you can add the component to any Lightning App or Record Page.

1. **Go to App Builder:**
   - In Salesforce, navigate to **Setup**.
   - In the Quick Find box, search for **App Builder** and open the **Lightning App Builder**.
   
2. **Edit a Page:**
   - Select a page (e.g., a Record Page) that you want to add the DynamicDataTable to, or create a new page.
   
3. **Add DynamicDataTable:**
   - In the components panel on the left, find **DynamicDataTable** under the **Custom Components** section.
   - Drag and drop it onto the page layout.

4. **Set Component Properties:**
   - In the right-hand properties pane, configure the following settings:
     - **Object Name**: Enter the API name of the object you want to display records for (e.g., `Account`, `Contact`).
     - **Fields**: Enter the API names of the fields you want to display (e.g., `Name, Industry, AnnualRevenue`).
     - **Search Field**: Set the API name of the field for the search filter (e.g., `Name`).

5. **Save & Activate:**
   - Save the page and activate it for the desired apps or profiles.

### Step 3: Using the Component

Once added to the page, the DynamicDataTable component will display records from the specified object. You can:

- Use the search bar to filter records.
- Sort columns by clicking on the column headers.
- Edit values directly in the table and save them using inline editing.
- Navigate between pages using the pagination controls.

### Step 4: Customizing the Component

You can customize the component by passing different object names and fields. You can configure the component for standard or custom objects and choose the fields to display.

### Step 5: Troubleshooting

If you encounter any issues with the installation or functionality of the component:

- Ensure the fields you provide exist on the object.
- Ensure you have the necessary permissions for the object and fields.
- Try reloading the page or clearing the cache if changes do not reflect immediately.

## Repository

You can also find the source code for this component on [GitHub](https://github.com/kousikohk/DynamicDataTable).


### Option 2: Install Using GitHub and SFDX

#### Prerequisites

1. **Salesforce CLI (SFDX):** Ensure you have the Salesforce CLI installed. [Download here](https://developer.salesforce.com/tools/sfdxcli).
2. **VS Code:** Download and install Visual Studio Code. [Download here](https://code.visualstudio.com/).
3. **Salesforce Extensions for VS Code:** Install the Salesforce extensions in VS Code. [Installation guide here](https://developer.salesforce.com/tools/vscode).

#### Step 1: Clone the GitHub Repository

1. Open VS Code.
2. Open the terminal in VS Code (`Ctrl + ~` on Windows/Linux or `Cmd + ~` on Mac).
3. Run the following command to clone the repository:

   ---bash
   git clone https://github.com/kousikohk/DynamicDataTable.git

4. Navigate to the cloned repository folder:

   cd DynamicDataTable

### Step 2: Authenticate to Your Salesforce Org
In the terminal, run the following command to authenticate and connect to your Salesforce org:
   sfdx force:auth:web:login -a myorg

   This will open a browser window where you can log in to your Salesforce org. After successful login, it will authenticate and set up your org.

### Step 3: Deploy the Component to Your Salesforce Org
Run the following command to deploy the component from the repository to your org:
sfdx force:source:deploy -p force-app/main/default
Once the deployment is successful, you should see a confirmation message in your terminal.

### Step 4: Verify the Deployment
1. Log in to your Salesforce org.
2. Go to **Setup** → **App Builder** → **Lightning App Builder**.
3. Add the **DynamicDataTable** component to a Lightning page as explained below

---

## Step-by-Step Instructions to Use the Component

### Step 1: Add the DynamicDataTable Component to a Page
1. **Go to App Builder:**
   - In Salesforce, navigate to **Setup**.
   - In the Quick Find box, search for **App Builder** and open the **Lightning App Builder**.
   
2. **Edit a Page:** (the package already contains the page Dynamic_Data_Table which can be accessed by assigning the logged in user the Dynamic Datatable Permission Set)
   - Select a page (e.g., a Record Page) that you want to add the **DynamicDataTable** to, or create a new page.
   
3. **Add DynamicDataTable:**
   - In the components panel on the left, find **DynamicDataTable** under the **Custom Components** section.
   - Drag and drop it onto the page layout.

4. **Set Component Properties:**
   - In the right-hand properties pane, configure the following settings:
     - **Object Name**: Enter the API name of the object you want to display records for (e.g., `Account`, `Contact`).
     - **Fields**: Enter the API names of the fields you want to display (e.g., `Name`, `Industry`, `AnnualRevenue`).
     - **Search Field**: Set the API name of the field for the search filter (e.g., `Name`).

5. **Save & Activate:**
   - Save the page and activate it for the desired apps or profiles.

### Step 2: Using the Component
Once added to the page, the **DynamicDataTable** component will display records from the specified object. You can:
- Use the search bar to filter records.
- Sort columns by clicking on the column headers.
- Edit values directly in the table and save them using inline editing.
- Navigate between pages using the pagination controls.

### Step 3: Customizing the Component
You can customize the component by passing different object names and fields. You can configure the component for standard or custom objects and choose the fields to display.

### Step 4: Troubleshooting
If you encounter any issues with the installation or functionality of the component:
- Ensure the fields you provide exist on the object.
- Ensure you have the necessary permissions for the object and fields.
- Try reloading the page or clearing the cache if changes do not reflect immediately.

Enjoy using the `DynamicDataTable`! Feel free to customize and extend it to suit your business needs.
