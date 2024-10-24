import { LightningElement, track, wire, api } from 'lwc';
import getRecords from '@salesforce/apex/DynamicDataTableController.getRecords';
import updateRecords from '@salesforce/apex/DynamicDataTableController.updateRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class DynamicDataTable extends LightningElement {
    @api objectName;         
    @api fields = [];        
    @api searchField;        
    @track records = [];
    @track displayedRecords = [];
    @track columns = [];
    @track draftValues = [];
    @track selectedRows = []; // Store selected rows
    @track sortedBy;
    @track sortedDirection = 'asc';
    @track searchKey = '';
    currentPage = 1;
    pageSize = 10;
    wiredRecordsResult; // Store result for refreshing

    connectedCallback() {
        // Set default values for fields and objectName
        if (!this.fields.length) {
            this.fields = [
                { label: 'Account Name', apiName: 'Name', editable: false },
                { label: 'Industry', apiName: 'Industry', editable: false },
                { label: 'Annual Revenue', apiName: 'AnnualRevenue', type: 'currency', editable: true }
            ];
        }
        this.objectName = this.objectName || 'Account';
        this.searchField = this.searchField || 'Name';

        this.columns = this.fields.map(field => ({
            label: field.label,
            fieldName: field.apiName,
            sortable: true,
            editable: field.editable || false,
            type: field.type || 'text'
        }));
    }

    @wire(getRecords, { sObjectName: '$objectName', fields: '$fieldNames', searchField: '$searchField', searchKey: '$searchKey' })
    wiredRecords({ error, data }) {
        this.wiredRecordsResult = data;  // Store data for refreshing
        if (data) {
            this.records = data;
            this.updateDisplayedRecords(); // Update displayed records based on current page
        } else if (error) {
            this.showError('Error loading records', error.body.message);
        }
    }

    handleSearch(event) {
        this.searchKey = event.target.value;
        this.updateDisplayedRecords(); // Update displayed records after search
    }

    handleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
    
        // Sort records
        const sortedData = [...this.records];
        const isNumeric = this.columns.find(col => col.fieldName === this.sortedBy).type === 'currency';

        sortedData.sort((a, b) => {
            let aVal = a[this.sortedBy] || ''; // Default to empty string if undefined
            let bVal = b[this.sortedBy] || ''; // Default to empty string if undefined
    
            if (isNumeric) {
                // Handle numeric sorting
                aVal = parseFloat(aVal) || 0; // Default to 0 if NaN
                bVal = parseFloat(bVal) || 0; // Default to 0 if NaN
                return this.sortedDirection === 'asc' ? aVal - bVal : bVal - aVal;
            } else {
                // Handle string sorting (case-insensitive)
                aVal = aVal.toString().toLowerCase(); // Convert to lower case
                bVal = bVal.toString().toLowerCase(); // Convert to lower case
                if (aVal === bVal) return 0; // If they are equal, return 0
                return this.sortedDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            }
        });

        this.records = sortedData; // Update sorted records
        this.updateDisplayedRecords(); // Refresh displayed records
    }

    handleSave(event) {
        const updatedValues = event.detail.draftValues;
        
        // Call Apex to save the edited values
        updateRecords({ updatedRecords: updatedValues })
            .then(() => {
                this.showSuccess('Record(s) updated successfully!');
                this.draftValues = []; // Clear draft values
                return refreshApex(this.wiredRecordsResult); // Refresh records
            })
            .then(() => {
                this.updateDisplayedRecords(); // Update displayed records after save
                this.selectedRows = []; // Clear selected rows after save
            })
            .catch(error => {
                this.showError('Error', 'Error updating records: ' + error.body.message);
            });
    }

    updateDisplayedRecords() {
        const startIdx = (this.currentPage - 1) * this.pageSize;
        const endIdx = startIdx + this.pageSize;
        this.displayedRecords = this.records.slice(startIdx, endIdx); // Get only the records for the current page
    }

    handlePrev() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateDisplayedRecords(); // Refresh displayed records
        }
    }

    handleNext() {
        const totalPages = Math.ceil(this.records.length / this.pageSize);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.updateDisplayedRecords(); // Refresh displayed records
        }
    }
    
    // Toast Event Error
    showError(title, message) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant: 'error' }));
    }

    // Toast Event Success
    showSuccess(message) {
        this.dispatchEvent(new ShowToastEvent({ title: 'Success', message, variant: 'success' }));
    }

    // Getters Start
    get disablePrev() {
        return this.currentPage === 1;
    }

    get disableNext() {
        return this.currentPage >= Math.ceil(this.records.length / this.pageSize);
    }

    get fieldNames() {
        return this.fields.map(field => field.apiName);
    }
    // Getters End
}
