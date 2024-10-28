public with sharing class DynamicDataTableController {
    @AuraEnabled(cacheable=true)
    public static List<SObject> getRecords(String sObjectName, String fields, String searchField, String searchKey) {
        // Construct SOQL query
        String query = 'SELECT Id,' + fields + ' FROM ' + sObjectName;
        
        // Add search condition if searchField and searchKey are provided
        if (searchKey != null && searchField != null && searchField != '') {
            query += ' WHERE ' + searchField + ' LIKE \'%' + String.escapeSingleQuotes(searchKey) + '%\'';
        }

        // Execute and return the query results
        return Database.query(query);
    }

    @AuraEnabled
    public static void updateRecords(List<SObject> updatedRecords) {
        if (updatedRecords != null && !updatedRecords.isEmpty()) {
            update updatedRecords;
        }
    }
}
