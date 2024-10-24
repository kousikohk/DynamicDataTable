@IsTest
public class DynamicDataTableControllerTest {

    @TestSetup
    static void setupTestData() {
        List<Account> accounts = new List<Account>();
        for (Integer i = 1; i <= 5; i++) {
            accounts.add(new Account(
                Name = 'Test Account ' + i,
                Industry = (i / 2 == 0) ? 'Technology' : 'Finance',
                AnnualRevenue = 10000 * i
            ));
        }
        insert accounts;
    }

    @IsTest
    static void testGetRecordsPositive() {
        List<String> fields = new List<String>{'Name', 'Industry', 'AnnualRevenue'};
        List<SObject> result = DynamicDataTableController.getRecords('Account', fields, 'Name', 'Test Account');
        System.assertNotEquals(0, result.size(), 'No records returned!');
        System.assertEquals(5, result.size(), 'Expected 5 records.');
        Account acc = (Account) result[0];
        System.assertNotEquals(null, acc.Name, 'Account name is null.');
        System.assertNotEquals(null, acc.Industry, 'Account industry is null.');
    }

    @IsTest
    static void testGetRecordsNoResults() {
        List<String> fields = new List<String>{'Name', 'Industry', 'AnnualRevenue'};
        List<SObject> result = DynamicDataTableController.getRecords('Account', fields, 'Name', 'Nonexistent Account');
        System.assertEquals(0, result.size(), 'Records should not be returned.');
    }

    @IsTest
    static void testGetRecordsEmptySearchKey() {
        List<String> fields = new List<String>{'Name', 'Industry', 'AnnualRevenue'};
        List<SObject> result = DynamicDataTableController.getRecords('Account', fields, 'Name', '');
        System.assertEquals(5, result.size(), 'Expected 5 records for empty search key.');
    }

    @IsTest
    static void testGetRecordsInvalidSObject() {
        List<String> fields = new List<String>{'Name', 'Industry', 'AnnualRevenue'};
        try {
            DynamicDataTableController.getRecords('InvalidObject', fields, 'Name', 'Test');
            System.assert(false, 'Expected an exception for invalid SObject name.');
        } catch (Exception e) {
            System.assert(e.getMessage().contains('sObject type'), 'Unexpected exception message: ' + e.getMessage());
        }
    }

    @IsTest
    static void testUpdateRecordsPositive() {
        List<Account> accounts = [SELECT Id, Name, Industry, AnnualRevenue FROM Account LIMIT 2];
        accounts[0].AnnualRevenue = 50000;
        accounts[1].AnnualRevenue = 60000;
        Test.startTest();
        DynamicDataTableController.updateRecords(accounts);
        Test.stopTest();
        Account updatedAcc1 = [SELECT AnnualRevenue FROM Account WHERE Id = :accounts[0].Id];
        Account updatedAcc2 = [SELECT AnnualRevenue FROM Account WHERE Id = :accounts[1].Id];
        System.assertEquals(50000, updatedAcc1.AnnualRevenue, 'AnnualRevenue not updated for the first account.');
        System.assertEquals(60000, updatedAcc2.AnnualRevenue, 'AnnualRevenue not updated for the second account.');
    }

    @IsTest
    static void testUpdateRecordsEmptyInput() {
        try {
            DynamicDataTableController.updateRecords(null);
            System.assert(true, 'No exception should be thrown for null input.');
            DynamicDataTableController.updateRecords(new List<SObject>());
            System.assert(true, 'No exception should be thrown for empty input.');
        } catch (Exception e) {
            System.assert(false, 'Exception thrown on null or empty input: ' + e.getMessage());
        }
    }
}
