public with sharing class DynamicDataTableController {
    @AuraEnabled(cacheable=true)
    public static List<SObject> getRecords(String sObjectName, List<String> fields, String searchField, String searchKey) {
        String query = 'SELECT Id,' + String.join(fields, ',') + ' FROM ' + sObjectName;
        
        if (searchKey != null && searchField != null && searchField != '') {
            query += ' WHERE ' + searchField + ' LIKE \'%' + searchKey + '%\'';
        }

        return Database.query(query);
    }

    @AuraEnabled
    public static void updateRecords(List<SObject> updatedRecords) {
        if (updatedRecords != null && !updatedRecords.isEmpty()) {
            update updatedRecords;
        }
    }
}