/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostListener, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListItem } from './multiselect.model';
export var /** @type {?} */ DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiSelectComponent; }),
    multi: true
};
var /** @type {?} */ noop = function () { };
var ɵ0 = noop;
var MultiSelectComponent = /** @class */ (function () {
    function MultiSelectComponent(cdr) {
        this.cdr = cdr;
        this._data = [];
        this.selectedItems = [];
        this.isDropdownOpen = true;
        this._placeholder = 'Select';
        this.filter = new ListItem(this.data);
        this.defaultSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'text',
            enableCheckAll: true,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: false,
            limitSelection: -1,
            clearSearchFilter: true,
            maxHeight: 197,
            itemsShowLimit: 999999999999,
            searchPlaceholderText: 'Search',
            noDataAvailablePlaceholderText: 'No data available',
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: false,
            defaultOpen: false
        };
        this.disabled = false;
        this.onFilterChange = new EventEmitter();
        this.onDropDownClose = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onDeSelect = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onDeSelectAll = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(MultiSelectComponent.prototype, "placeholder", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._placeholder = value;
            }
            else {
                this._placeholder = 'Select';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "settings", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._settings = Object.assign(this.defaultSettings, value);
            }
            else {
                this._settings = Object.assign(this.defaultSettings);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "data", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (!value) {
                this._data = [];
            }
            else {
                // const _items = value.filter((item: any) => {
                //   if (typeof item === 'string' || (typeof item === 'object' && item && item[this._settings.idField] && item[this._settings.textField])) {
                //     return item;
                //   }
                // });
                this._data = value.map(function (item) {
                    return typeof item === 'string'
                        ? new ListItem(item)
                        : new ListItem({
                            id: item[_this._settings.idField],
                            text: item[_this._settings.textField]
                        });
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} $event
     * @return {?}
     */
    MultiSelectComponent.prototype.onFilterTextChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onFilterChange.emit($event);
    };
    /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    MultiSelectComponent.prototype.onItemClick = /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    function ($event, item) {
        if (this.disabled) {
            return false;
        }
        var /** @type {?} */ found = this.isSelected(item);
        var /** @type {?} */ allowAdd = this._settings.limitSelection === -1 ||
            (this._settings.limitSelection > 0 &&
                this.selectedItems.length < this._settings.limitSelection);
        if (!found) {
            if (allowAdd) {
                this.addSelected(item);
            }
        }
        else {
            this.removeSelected(item);
        }
        if (this._settings.singleSelection &&
            this._settings.closeDropDownOnSelection) {
            this.closeDropdown();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MultiSelectComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value !== undefined && value !== null && value.length > 0) {
            if (this._settings.singleSelection) {
                try {
                    if (value.length >= 1) {
                        var /** @type {?} */ firstItem = value[0];
                        this.selectedItems = [
                            typeof firstItem === 'string'
                                ? new ListItem(firstItem)
                                : new ListItem({
                                    id: firstItem[this._settings.idField],
                                    text: firstItem[this._settings.textField]
                                })
                        ];
                    }
                }
                catch (/** @type {?} */ e) {
                    // console.error(e.body.msg);
                }
            }
            else {
                var /** @type {?} */ _data = value.map(function (item) {
                    return typeof item === 'string'
                        ? new ListItem(item)
                        : new ListItem({
                            id: item[_this._settings.idField],
                            text: item[_this._settings.textField]
                        });
                });
                if (this._settings.limitSelection > 0) {
                    this.selectedItems = _data.splice(0, this._settings.limitSelection);
                }
                else {
                    this.selectedItems = _data;
                }
            }
        }
        else {
            this.selectedItems = [];
        }
        this.onChangeCallback(value);
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    MultiSelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    MultiSelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.onTouched = /**
     * @return {?}
     */
    function () {
        this.closeDropdown();
        this.onTouchedCallback();
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    MultiSelectComponent.prototype.trackByFn = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return item.id;
    };
    /**
     * @param {?} clickedItem
     * @return {?}
     */
    MultiSelectComponent.prototype.isSelected = /**
     * @param {?} clickedItem
     * @return {?}
     */
    function (clickedItem) {
        var /** @type {?} */ found = false;
        this.selectedItems.forEach(function (item) {
            if (clickedItem.id === item.id) {
                found = true;
            }
        });
        return found;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.isLimitSelectionReached = /**
     * @return {?}
     */
    function () {
        return this._settings.limitSelection === this.selectedItems.length;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.isAllItemsSelected = /**
     * @return {?}
     */
    function () {
        return this._data.length === this.selectedItems.length;
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.showButton = /**
     * @return {?}
     */
    function () {
        if (!this._settings.singleSelection) {
            if (this._settings.limitSelection > 0) {
                return false;
            }
            // this._settings.enableCheckAll = this._settings.limitSelection === -1 ? true : false;
            return true; // !this._settings.singleSelection && this._settings.enableCheckAll && this._data.length > 0;
        }
        else {
            // should be disabled in single selection mode
            return false;
        }
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.itemShowRemaining = /**
     * @return {?}
     */
    function () {
        return this.selectedItems.length - this._settings.itemsShowLimit;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    MultiSelectComponent.prototype.addSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this._settings.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
        }
        else {
            this.selectedItems.push(item);
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onSelect.emit(this.emittedValue(item));
    };
    /**
     * @param {?} itemSel
     * @return {?}
     */
    MultiSelectComponent.prototype.removeSelected = /**
     * @param {?} itemSel
     * @return {?}
     */
    function (itemSel) {
        var _this = this;
        this.selectedItems.forEach(function (item) {
            if (itemSel.id === item.id) {
                _this.selectedItems.splice(_this.selectedItems.indexOf(item), 1);
            }
        });
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onDeSelect.emit(this.emittedValue(itemSel));
    };
    /**
     * @param {?} val
     * @return {?}
     */
    MultiSelectComponent.prototype.emittedValue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        var _this = this;
        var /** @type {?} */ selected = [];
        if (Array.isArray(val)) {
            val.map(function (item) {
                if (item.id === item.text) {
                    selected.push(item.text);
                }
                else {
                    selected.push(_this.objectify(item));
                }
            });
        }
        else {
            if (val) {
                if (val.id === val.text) {
                    return val.text;
                }
                else {
                    return this.objectify(val);
                }
            }
        }
        return selected;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    MultiSelectComponent.prototype.objectify = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        var /** @type {?} */ obj = {};
        obj[this._settings.idField] = val.id;
        obj[this._settings.textField] = val.text;
        return obj;
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    MultiSelectComponent.prototype.toggleDropdown = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        if (this.disabled && this._settings.singleSelection) {
            return;
        }
        this._settings.defaultOpen = !this._settings.defaultOpen;
        if (!this._settings.defaultOpen) {
            this.onDropDownClose.emit();
        }
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.closeDropdown = /**
     * @return {?}
     */
    function () {
        this._settings.defaultOpen = false;
        // clear search text
        if (this._settings.clearSearchFilter) {
            this.filter.text = '';
        }
        this.onDropDownClose.emit();
    };
    /**
     * @return {?}
     */
    MultiSelectComponent.prototype.toggleSelectAll = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return false;
        }
        if (!this.isAllItemsSelected()) {
            this.selectedItems = this._data.slice();
            this.onSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        else {
            this.selectedItems = [];
            this.onDeSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
    };
    MultiSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-multiselect-dropdown',
                    template: "<div tabindex=\"=0\" (blur)=\"onTouched()\" class=\"multiselect-dropdown\" (clickOutside)=\"closeDropdown()\">\n  <div [class.disabled]=\"disabled\">\n    <span tabindex=\"-1\" class=\"dropdown-btn\" (click)=\"toggleDropdown($event)\">\n      <span *ngIf=\"selectedItems.length == 0\">{{_placeholder}}</span>\n      <span class=\"selected-item\" *ngFor=\"let item of selectedItems;trackBy: trackByFn;let k = index\" [hidden]=\"k > _settings.itemsShowLimit-1\">\n        {{item.text}}\n        <a style=\"padding-top:2px;padding-left:2px;color:white\" (click)=\"onItemClick($event,item)\">x</a>\n      </span>\n      <span style=\"float:right !important;padding-right:4px\">\n        <span style=\"padding-right: 6px;\" *ngIf=\"itemShowRemaining()>0\">+{{itemShowRemaining()}}</span>\n        <span [ngClass]=\"_settings.defaultOpen ? 'dropdown-up' : 'dropdown-down'\"></span>\n      </span>\n    </span>\n  </div>\n  <div class=\"dropdown-list\" [hidden]=\"!_settings.defaultOpen\">\n    <ul class=\"item1\">\n      <li (click)=\"toggleSelectAll()\" *ngIf=\"_data.length > 0 && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1\" class=\"multiselect-item-checkbox\" style=\"border-bottom: 1px solid #ccc;padding:10px\">\n        <input type=\"checkbox\" aria-label=\"multiselect-select-all\" [checked]=\"isAllItemsSelected()\" [disabled]=\"disabled || isLimitSelectionReached()\" />\n        <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>\n      </li>\n      <li class=\"filter-textbox\" *ngIf=\"_data.length>0 && _settings.allowSearchFilter\">\n        <input type=\"text\" aria-label=\"multiselect-search\" [readOnly]=\"disabled\" [placeholder]=\"_settings.searchPlaceholderText\" [(ngModel)]=\"filter.text\" (ngModelChange)=\"onFilterTextChange($event)\">\n      </li>\n    </ul>\n    <ul class=\"item2\" [style.maxHeight]=\"_settings.maxHeight+'px'\">\n      <li *ngFor=\"let item of _data | ng2ListFilter:filter; let i = index;\" (click)=\"onItemClick($event,item)\" class=\"multiselect-item-checkbox\">\n        <input type=\"checkbox\" aria-label=\"multiselect-item\" [checked]=\"isSelected(item)\" [disabled]=\"disabled || (isLimitSelectionReached() && !isSelected(item))\" />\n        <div>{{item.text}}</div>\n      </li>\n      <li class='no-data' *ngIf=\"_data.length == 0\">\n        <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>\n      </li>\n    </ul>\n  </div>\n</div>",
                    styles: [".multiselect-dropdown{position:relative;width:100%;font-size:inherit;font-family:inherit}.multiselect-dropdown .dropdown-btn{display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .disabled>span{background-color:#eceeef}.dropdown-list{position:absolute;padding-top:6px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:10px;box-shadow:0 1px 5px #959595}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.dropdown-list .filter-textbox input:focus{outline:0}.multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-item-checkbox input[type=checkbox]:active+div:before{transition-duration:0s}.multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:'';color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;transition:all .4s ease}.multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:'';position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;transition:-webkit-transform .2s ease-out;transition:transform .2s ease-out;transition:transform .2s ease-out,-webkit-transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:'';transition:-webkit-transform .2s ease-out;transition:transform .2s ease-out;transition:transform .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}.multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}"],
                    providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MultiSelectComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
    ]; };
    MultiSelectComponent.propDecorators = {
        "placeholder": [{ type: Input },],
        "disabled": [{ type: Input },],
        "settings": [{ type: Input },],
        "data": [{ type: Input },],
        "onFilterChange": [{ type: Output, args: ['onFilterChange',] },],
        "onDropDownClose": [{ type: Output, args: ['onDropDownClose',] },],
        "onSelect": [{ type: Output, args: ['onSelect',] },],
        "onDeSelect": [{ type: Output, args: ['onDeSelect',] },],
        "onSelectAll": [{ type: Output, args: ['onSelectAll',] },],
        "onDeSelectAll": [{ type: Output, args: ['onDeSelectAll',] },],
        "onTouched": [{ type: HostListener, args: ['blur',] },],
    };
    return MultiSelectComponent;
}());
export { MultiSelectComponent };
function MultiSelectComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MultiSelectComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MultiSelectComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MultiSelectComponent.propDecorators;
    /** @type {?} */
    MultiSelectComponent.prototype._settings;
    /** @type {?} */
    MultiSelectComponent.prototype._data;
    /** @type {?} */
    MultiSelectComponent.prototype.selectedItems;
    /** @type {?} */
    MultiSelectComponent.prototype.isDropdownOpen;
    /** @type {?} */
    MultiSelectComponent.prototype._placeholder;
    /** @type {?} */
    MultiSelectComponent.prototype.filter;
    /** @type {?} */
    MultiSelectComponent.prototype.defaultSettings;
    /** @type {?} */
    MultiSelectComponent.prototype.disabled;
    /** @type {?} */
    MultiSelectComponent.prototype.onFilterChange;
    /** @type {?} */
    MultiSelectComponent.prototype.onDropDownClose;
    /** @type {?} */
    MultiSelectComponent.prototype.onSelect;
    /** @type {?} */
    MultiSelectComponent.prototype.onDeSelect;
    /** @type {?} */
    MultiSelectComponent.prototype.onSelectAll;
    /** @type {?} */
    MultiSelectComponent.prototype.onDeSelectAll;
    /** @type {?} */
    MultiSelectComponent.prototype.onTouchedCallback;
    /** @type {?} */
    MultiSelectComponent.prototype.onChangeCallback;
    /** @type {?} */
    MultiSelectComponent.prototype.cdr;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vIiwic291cmNlcyI6WyJtdWx0aXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFxQixNQUFNLHFCQUFxQixDQUFDO0FBRWxFLE1BQU0sQ0FBQyxxQkFBTSwrQkFBK0IsR0FBUTtJQUNsRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG9CQUFvQixFQUFwQixDQUFvQixDQUFDO0lBQ25ELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUNGLHFCQUFNLElBQUksR0FBRyxlQUFRLENBQUM7OztJQXVJcEIsOEJBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO3FCQTFGVixFQUFFOzZCQUNNLEVBQUU7OEJBQ2xCLElBQUk7NEJBQ2IsUUFBUTtzQkFDSixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOytCQUNMO1lBQ25DLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFLE1BQU07WUFDakIsY0FBYyxFQUFFLElBQUk7WUFDcEIsYUFBYSxFQUFFLFlBQVk7WUFDM0IsZUFBZSxFQUFFLGNBQWM7WUFDL0IsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsU0FBUyxFQUFFLEdB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QUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7S0FDOUQ7O2dCQWxWRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsUUFBUSxFQUFFLDQ2RUFrQ0w7b0JBQ0wsTUFBTSxFQUFFLENBQUMsdS9IQUF1L0gsQ0FBQztvQkFDamdJLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO29CQUM1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBcERDLGlCQUFpQjs7O2dDQStFaEIsS0FBSzs2QkFRTCxLQUFLOzZCQUdMLEtBQUs7eUJBU0wsS0FBSzttQ0FzQkwsTUFBTSxTQUFDLGdCQUFnQjtvQ0FFdkIsTUFBTSxTQUFDLGlCQUFpQjs2QkFHeEIsTUFBTSxTQUFDLFVBQVU7K0JBR2pCLE1BQU0sU0FBQyxZQUFZO2dDQUduQixNQUFNLFNBQUMsYUFBYTtrQ0FHcEIsTUFBTSxTQUFDLGVBQWU7OEJBd0Z0QixZQUFZLFNBQUMsTUFBTTs7K0JBdk90Qjs7U0E2RGEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IExpc3RJdGVtLCBJRHJvcGRvd25TZXR0aW5ncyB9IGZyb20gJy4vbXVsdGlzZWxlY3QubW9kZWwnO1xyXG5cclxuZXhwb3J0IGNvbnN0IERST1BET1dOX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aVNlbGVjdENvbXBvbmVudCksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1tdWx0aXNlbGVjdC1kcm9wZG93bicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IHRhYmluZGV4PVwiPTBcIiAoYmx1cik9XCJvblRvdWNoZWQoKVwiIGNsYXNzPVwibXVsdGlzZWxlY3QtZHJvcGRvd25cIiAoY2xpY2tPdXRzaWRlKT1cImNsb3NlRHJvcGRvd24oKVwiPlxyXG4gIDxkaXYgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XHJcbiAgICA8c3BhbiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJkcm9wZG93bi1idG5cIiAoY2xpY2spPVwidG9nZ2xlRHJvcGRvd24oJGV2ZW50KVwiPlxyXG4gICAgICA8c3BhbiAqbmdJZj1cInNlbGVjdGVkSXRlbXMubGVuZ3RoID09IDBcIj57e19wbGFjZWhvbGRlcn19PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdGVkLWl0ZW1cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzZWxlY3RlZEl0ZW1zO3RyYWNrQnk6IHRyYWNrQnlGbjtsZXQgayA9IGluZGV4XCIgW2hpZGRlbl09XCJrID4gX3NldHRpbmdzLml0ZW1zU2hvd0xpbWl0LTFcIj5cclxuICAgICAgICB7e2l0ZW0udGV4dH19XHJcbiAgICAgICAgPGEgc3R5bGU9XCJwYWRkaW5nLXRvcDoycHg7cGFkZGluZy1sZWZ0OjJweDtjb2xvcjp3aGl0ZVwiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsaXRlbSlcIj54PC9hPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIDxzcGFuIHN0eWxlPVwiZmxvYXQ6cmlnaHQgIWltcG9ydGFudDtwYWRkaW5nLXJpZ2h0OjRweFwiPlxyXG4gICAgICAgIDxzcGFuIHN0eWxlPVwicGFkZGluZy1yaWdodDogNnB4O1wiICpuZ0lmPVwiaXRlbVNob3dSZW1haW5pbmcoKT4wXCI+K3t7aXRlbVNob3dSZW1haW5pbmcoKX19PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cIl9zZXR0aW5ncy5kZWZhdWx0T3BlbiA/ICdkcm9wZG93bi11cCcgOiAnZHJvcGRvd24tZG93bidcIj48L3NwYW4+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvc3Bhbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbGlzdFwiIFtoaWRkZW5dPVwiIV9zZXR0aW5ncy5kZWZhdWx0T3BlblwiPlxyXG4gICAgPHVsIGNsYXNzPVwiaXRlbTFcIj5cclxuICAgICAgPGxpIChjbGljayk9XCJ0b2dnbGVTZWxlY3RBbGwoKVwiICpuZ0lmPVwiX2RhdGEubGVuZ3RoID4gMCAmJiAhX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiAmJiBfc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgJiYgX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uPT09LTFcIiBjbGFzcz1cIm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3hcIiBzdHlsZT1cImJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO3BhZGRpbmc6MTBweFwiPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBhcmlhLWxhYmVsPVwibXVsdGlzZWxlY3Qtc2VsZWN0LWFsbFwiIFtjaGVja2VkXT1cImlzQWxsSXRlbXNTZWxlY3RlZCgpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IGlzTGltaXRTZWxlY3Rpb25SZWFjaGVkKClcIiAvPlxyXG4gICAgICAgIDxkaXY+e3shaXNBbGxJdGVtc1NlbGVjdGVkKCkgPyBfc2V0dGluZ3Muc2VsZWN0QWxsVGV4dCA6IF9zZXR0aW5ncy51blNlbGVjdEFsbFRleHR9fTwvZGl2PlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3M9XCJmaWx0ZXItdGV4dGJveFwiICpuZ0lmPVwiX2RhdGEubGVuZ3RoPjAgJiYgX3NldHRpbmdzLmFsbG93U2VhcmNoRmlsdGVyXCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgYXJpYS1sYWJlbD1cIm11bHRpc2VsZWN0LXNlYXJjaFwiIFtyZWFkT25seV09XCJkaXNhYmxlZFwiIFtwbGFjZWhvbGRlcl09XCJfc2V0dGluZ3Muc2VhcmNoUGxhY2Vob2xkZXJUZXh0XCIgWyhuZ01vZGVsKV09XCJmaWx0ZXIudGV4dFwiIChuZ01vZGVsQ2hhbmdlKT1cIm9uRmlsdGVyVGV4dENoYW5nZSgkZXZlbnQpXCI+XHJcbiAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG4gICAgPHVsIGNsYXNzPVwiaXRlbTJcIiBbc3R5bGUubWF4SGVpZ2h0XT1cIl9zZXR0aW5ncy5tYXhIZWlnaHQrJ3B4J1wiPlxyXG4gICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2RhdGEgfCBuZzJMaXN0RmlsdGVyOmZpbHRlcjsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LGl0ZW0pXCIgY2xhc3M9XCJtdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94XCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGFyaWEtbGFiZWw9XCJtdWx0aXNlbGVjdC1pdGVtXCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZChpdGVtKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCAoaXNMaW1pdFNlbGVjdGlvblJlYWNoZWQoKSAmJiAhaXNTZWxlY3RlZChpdGVtKSlcIiAvPlxyXG4gICAgICAgIDxkaXY+e3tpdGVtLnRleHR9fTwvZGl2PlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgY2xhc3M9J25vLWRhdGEnICpuZ0lmPVwiX2RhdGEubGVuZ3RoID09IDBcIj5cclxuICAgICAgICA8aDU+e3tfc2V0dGluZ3Mubm9EYXRhQXZhaWxhYmxlUGxhY2Vob2xkZXJUZXh0fX08L2g1PlxyXG4gICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuICA8L2Rpdj5cclxuPC9kaXY+YCxcclxuICBzdHlsZXM6IFtgLm11bHRpc2VsZWN0LWRyb3Bkb3due3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCU7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC1mYW1pbHk6aW5oZXJpdH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0bntkaXNwbGF5OmlubGluZS1ibG9jaztib3JkZXI6MXB4IHNvbGlkICNhZGFkYWQ7d2lkdGg6MTAwJTtwYWRkaW5nOjZweCAxMnB4O21hcmdpbi1ib3R0b206MDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MS41Mjg1NzE0Mzt0ZXh0LWFsaWduOmxlZnQ7dmVydGljYWwtYWxpZ246bWlkZGxlO2N1cnNvcjpwb2ludGVyO2JhY2tncm91bmQtaW1hZ2U6bm9uZTtib3JkZXItcmFkaXVzOjRweH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuc2VsZWN0ZWQtaXRlbXtib3JkZXI6MXB4IHNvbGlkICMzMzdhYjc7bWFyZ2luLXJpZ2h0OjRweDtiYWNrZ3JvdW5kOiMzMzdhYjc7cGFkZGluZzowIDVweDtjb2xvcjojZmZmO2JvcmRlci1yYWRpdXM6MnB4O2Zsb2F0OmxlZnR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLnNlbGVjdGVkLWl0ZW0gYXt0ZXh0LWRlY29yYXRpb246bm9uZX0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuc2VsZWN0ZWQtaXRlbTpob3Zlcntib3gtc2hhZG93OjFweCAxcHggIzk1OTU5NX0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuZHJvcGRvd24tZG93bntkaXNwbGF5OmlubGluZS1ibG9jazt0b3A6MTBweDt3aWR0aDowO2hlaWdodDowO2JvcmRlci10b3A6MTBweCBzb2xpZCAjYWRhZGFkO2JvcmRlci1sZWZ0OjEwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjEwcHggc29saWQgdHJhbnNwYXJlbnR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLmRyb3Bkb3duLXVwe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLWJvdHRvbToxMHB4IHNvbGlkICNhZGFkYWQ7Ym9yZGVyLWxlZnQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRpc2FibGVkPnNwYW57YmFja2dyb3VuZC1jb2xvcjojZWNlZWVmfS5kcm9wZG93bi1saXN0e3Bvc2l0aW9uOmFic29sdXRlO3BhZGRpbmctdG9wOjZweDt3aWR0aDoxMDAlO3otaW5kZXg6OTk5OTtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDojZmZmO21hcmdpbi10b3A6MTBweDtib3gtc2hhZG93OjAgMXB4IDVweCAjOTU5NTk1fS5kcm9wZG93bi1saXN0IHVse3BhZGRpbmc6MDtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6YXV0bzttYXJnaW46MH0uZHJvcGRvd24tbGlzdCBsaXtwYWRkaW5nOjZweCAxMHB4O2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246bGVmdH0uZHJvcGRvd24tbGlzdCAuZmlsdGVyLXRleHRib3h7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2NjYztwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjEwcHh9LmRyb3Bkb3duLWxpc3QgLmZpbHRlci10ZXh0Ym94IGlucHV0e2JvcmRlcjowO3dpZHRoOjEwMCU7cGFkZGluZzowIDAgMCAyNnB4fS5kcm9wZG93bi1saXN0IC5maWx0ZXItdGV4dGJveCBpbnB1dDpmb2N1c3tvdXRsaW5lOjB9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF17Ym9yZGVyOjA7Y2xpcDpyZWN0KDAgMCAwIDApO2hlaWdodDoxcHg7bWFyZ2luOi0xcHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHh9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Zm9jdXMrZGl2OmJlZm9yZSwubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpob3ZlcitkaXY6YmVmb3Jle2JvcmRlci1jb2xvcjojMzM3YWI3O2JhY2tncm91bmQtY29sb3I6I2YyZjJmMn0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTphY3RpdmUrZGl2OmJlZm9yZXt0cmFuc2l0aW9uLWR1cmF0aW9uOjBzfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdK2Rpdntwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLWxlZnQ6MmVtO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luOjA7Y29sb3I6IzAwMH0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XStkaXY6YmVmb3Jle2JveC1zaXppbmc6Y29udGVudC1ib3g7Y29udGVudDonJztjb2xvcjojMzM3YWI3O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDowO3dpZHRoOjE0cHg7aGVpZ2h0OjE0cHg7bWFyZ2luLXRvcDotOXB4O2JvcmRlcjoycHggc29saWQgIzMzN2FiNzt0ZXh0LWFsaWduOmNlbnRlcjt0cmFuc2l0aW9uOmFsbCAuNHMgZWFzZX0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XStkaXY6YWZ0ZXJ7Ym94LXNpemluZzpjb250ZW50LWJveDtjb250ZW50OicnO3Bvc2l0aW9uOmFic29sdXRlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46NTAlO3RyYW5zZm9ybS1vcmlnaW46NTAlO3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0O3RyYW5zaXRpb246dHJhbnNmb3JtIC4ycyBlYXNlLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7dG9wOjUwJTtsZWZ0OjRweDt3aWR0aDo4cHg7aGVpZ2h0OjNweDttYXJnaW4tdG9wOi00cHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1jb2xvcjojZmZmO2JvcmRlci13aWR0aDowIDAgM3B4IDNweDstby1ib3JkZXItaW1hZ2U6bm9uZTtib3JkZXItaW1hZ2U6bm9uZTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgwKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMCl9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06ZGlzYWJsZWQrZGl2OmJlZm9yZXtib3JkZXItY29sb3I6I2NjY30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpkaXNhYmxlZDpmb2N1cytkaXY6YmVmb3JlIC5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmhvdmVyK2RpdjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0fS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmNoZWNrZWQrZGl2OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNjY2N9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCtkaXY6YWZ0ZXJ7Y29udGVudDonJzt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4ycyBlYXNlLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXQ7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzIGVhc2Utb3V0LC13ZWJraXQtdHJhbnNmb3JtIC4ycyBlYXNlLW91dDstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgxKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMSl9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCtkaXY6YmVmb3Jley13ZWJraXQtYW5pbWF0aW9uOi4ycyBlYXNlLWluIGJvcmRlcnNjYWxlO2FuaW1hdGlvbjouMnMgZWFzZS1pbiBib3JkZXJzY2FsZTtiYWNrZ3JvdW5kOiMzMzdhYjd9QC13ZWJraXQta2V5ZnJhbWVzIGJvcmRlcnNjYWxlezUwJXtib3gtc2hhZG93OjAgMCAwIDJweCAjMzM3YWI3fX1Aa2V5ZnJhbWVzIGJvcmRlcnNjYWxlezUwJXtib3gtc2hhZG93OjAgMCAwIDJweCAjMzM3YWI3fX1gXSxcclxuICBwcm92aWRlcnM6IFtEUk9QRE9XTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgcHVibGljIF9zZXR0aW5nczogSURyb3Bkb3duU2V0dGluZ3M7XHJcbiAgcHVibGljIF9kYXRhOiBBcnJheTxMaXN0SXRlbT4gPSBbXTtcclxuICBwdWJsaWMgc2VsZWN0ZWRJdGVtczogQXJyYXk8TGlzdEl0ZW0+ID0gW107XHJcbiAgcHVibGljIGlzRHJvcGRvd25PcGVuID0gdHJ1ZTtcclxuICBfcGxhY2Vob2xkZXIgPSAnU2VsZWN0JztcclxuICBmaWx0ZXI6IExpc3RJdGVtID0gbmV3IExpc3RJdGVtKHRoaXMuZGF0YSk7XHJcbiAgZGVmYXVsdFNldHRpbmdzOiBJRHJvcGRvd25TZXR0aW5ncyA9IHtcclxuICAgIHNpbmdsZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICBpZEZpZWxkOiAnaWQnLFxyXG4gICAgdGV4dEZpZWxkOiAndGV4dCcsXHJcbiAgICBlbmFibGVDaGVja0FsbDogdHJ1ZSxcclxuICAgIHNlbGVjdEFsbFRleHQ6ICdTZWxlY3QgQWxsJyxcclxuICAgIHVuU2VsZWN0QWxsVGV4dDogJ1VuU2VsZWN0IEFsbCcsXHJcbiAgICBhbGxvd1NlYXJjaEZpbHRlcjogZmFsc2UsXHJcbiAgICBsaW1pdFNlbGVjdGlvbjogLTEsXHJcbiAgICBjbGVhclNlYXJjaEZpbHRlcjogdHJ1ZSxcclxuICAgIG1heEhlaWdodDogMTk3LFxyXG4gICAgaXRlbXNTaG93TGltaXQ6IDk5OTk5OTk5OTk5OSxcclxuICAgIHNlYXJjaFBsYWNlaG9sZGVyVGV4dDogJ1NlYXJjaCcsXHJcbiAgICBub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHQ6ICdObyBkYXRhIGF2YWlsYWJsZScsXHJcbiAgICBjbG9zZURyb3BEb3duT25TZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgc2hvd1NlbGVjdGVkSXRlbXNBdFRvcDogZmFsc2UsXHJcbiAgICBkZWZhdWx0T3BlbjogZmFsc2VcclxuICB9O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9ICdTZWxlY3QnO1xyXG4gICAgfVxyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHNldCBzZXR0aW5ncyh2YWx1ZTogSURyb3Bkb3duU2V0dGluZ3MpIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MsIHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRTZXR0aW5ncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogQXJyYXk8YW55Pikge1xyXG4gICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBjb25zdCBfaXRlbXMgPSB2YWx1ZS5maWx0ZXIoKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAvLyAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgfHwgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0gJiYgaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdKSkge1xyXG4gICAgICAvLyAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9KTtcclxuICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlLm1hcChcclxuICAgICAgICAoaXRlbTogYW55KSA9PlxyXG4gICAgICAgICAgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGl0ZW0pXHJcbiAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcclxuICAgICAgICAgICAgICAgIGlkOiBpdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBPdXRwdXQoJ29uRmlsdGVyQ2hhbmdlJylcclxuICBvbkZpbHRlckNoYW5nZTogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoJ29uRHJvcERvd25DbG9zZScpXHJcbiAgb25Ecm9wRG93bkNsb3NlOiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIEBPdXRwdXQoJ29uU2VsZWN0JylcclxuICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBAT3V0cHV0KCdvbkRlU2VsZWN0JylcclxuICBvbkRlU2VsZWN0OiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIEBPdXRwdXQoJ29uU2VsZWN0QWxsJylcclxuICBvblNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PExpc3RJdGVtPj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XHJcblxyXG4gIEBPdXRwdXQoJ29uRGVTZWxlY3RBbGwnKVxyXG4gIG9uRGVTZWxlY3RBbGw6IEV2ZW50RW1pdHRlcjxBcnJheTxMaXN0SXRlbT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xyXG5cclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcclxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xyXG5cclxuICBvbkZpbHRlclRleHRDaGFuZ2UoJGV2ZW50KSB7XHJcbiAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuXHJcbiAgb25JdGVtQ2xpY2soJGV2ZW50OiBhbnksIGl0ZW06IExpc3RJdGVtKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLmlzU2VsZWN0ZWQoaXRlbSk7XHJcbiAgICBjb25zdCBhbGxvd0FkZCA9XHJcbiAgICAgIHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSAtMSB8fFxyXG4gICAgICAodGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPiAwICYmXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA8IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uKTtcclxuICAgIGlmICghZm91bmQpIHtcclxuICAgICAgaWYgKGFsbG93QWRkKSB7XHJcbiAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZChpdGVtKTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmXHJcbiAgICAgIHRoaXMuX3NldHRpbmdzLmNsb3NlRHJvcERvd25PblNlbGVjdGlvblxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IHZhbHVlWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXHJcbiAgICAgICAgICAgICAgdHlwZW9mIGZpcnN0SXRlbSA9PT0gJ3N0cmluZydcclxuICAgICAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGZpcnN0SXRlbSlcclxuICAgICAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogZmlyc3RJdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGZpcnN0SXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlLmJvZHkubXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgX2RhdGEgPSB2YWx1ZS5tYXAoXHJcbiAgICAgICAgICAoaXRlbTogYW55KSA9PlxyXG4gICAgICAgICAgICB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZydcclxuICAgICAgICAgICAgICA/IG5ldyBMaXN0SXRlbShpdGVtKVxyXG4gICAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXHJcbiAgICAgICAgICAgICAgICAgIHRleHQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA+IDApIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IF9kYXRhLnNwbGljZSgwLCB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IF9kYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xyXG4gIH1cclxuXHJcbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XHJcbiAgfVxyXG5cclxuICAvLyBTZXQgdG91Y2hlZCBvbiBibHVyXHJcbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXHJcbiAgcHVibGljIG9uVG91Y2hlZCgpIHtcclxuICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeUZuKGluZGV4LCBpdGVtKSB7XHJcbiAgICByZXR1cm4gaXRlbS5pZDtcclxuICB9XHJcblxyXG4gIGlzU2VsZWN0ZWQoY2xpY2tlZEl0ZW06IExpc3RJdGVtKSB7XHJcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBpZiAoY2xpY2tlZEl0ZW0uaWQgPT09IGl0ZW0uaWQpIHtcclxuICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGZvdW5kO1xyXG4gIH1cclxuXHJcbiAgaXNMaW1pdFNlbGVjdGlvblJlYWNoZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT09IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBpc0FsbEl0ZW1zU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5sZW5ndGggPT09IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBzaG93QnV0dG9uKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcclxuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICAvLyB0aGlzLl9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCA9IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSAtMSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRydWU7IC8vICF0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24gJiYgdGhpcy5fc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgJiYgdGhpcy5fZGF0YS5sZW5ndGggPiAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gc2hvdWxkIGJlIGRpc2FibGVkIGluIHNpbmdsZSBzZWxlY3Rpb24gbW9kZVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpdGVtU2hvd1JlbWFpbmluZygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSB0aGlzLl9zZXR0aW5ncy5pdGVtc1Nob3dMaW1pdDtcclxuICB9XHJcblxyXG4gIGFkZFNlbGVjdGVkKGl0ZW06IExpc3RJdGVtKSB7XHJcbiAgICBpZiAodGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xyXG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKGl0ZW0pKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVNlbGVjdGVkKGl0ZW1TZWw6IExpc3RJdGVtKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgaWYgKGl0ZW1TZWwuaWQgPT09IGl0ZW0uaWQpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKHRoaXMuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XHJcbiAgICB0aGlzLm9uRGVTZWxlY3QuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZShpdGVtU2VsKSk7XHJcbiAgfVxyXG5cclxuICBlbWl0dGVkVmFsdWUodmFsOiBhbnkpOiBhbnkge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBbXTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcclxuICAgICAgdmFsLm1hcChpdGVtID0+IHtcclxuICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaXRlbS50ZXh0KSB7XHJcbiAgICAgICAgICBzZWxlY3RlZC5wdXNoKGl0ZW0udGV4dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNlbGVjdGVkLnB1c2godGhpcy5vYmplY3RpZnkoaXRlbSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbC5pZCA9PT0gdmFsLnRleHQpIHtcclxuICAgICAgICAgIHJldHVybiB2YWwudGV4dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0aWZ5KHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0ZWQ7XHJcbiAgfVxyXG5cclxuICBvYmplY3RpZnkodmFsOiBMaXN0SXRlbSkge1xyXG4gICAgY29uc3Qgb2JqID0ge307XHJcbiAgICBvYmpbdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0gPSB2YWwuaWQ7XHJcbiAgICBvYmpbdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXSA9IHZhbC50ZXh0O1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcblxyXG4gIHRvZ2dsZURyb3Bkb3duKGV2dCkge1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCAmJiB0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE9wZW4gPSAhdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE9wZW47XHJcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzLmRlZmF1bHRPcGVuKSB7XHJcbiAgICAgIHRoaXMub25Ecm9wRG93bkNsb3NlLmVtaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNsb3NlRHJvcGRvd24oKSB7XHJcbiAgICB0aGlzLl9zZXR0aW5ncy5kZWZhdWx0T3BlbiA9IGZhbHNlO1xyXG4gICAgLy8gY2xlYXIgc2VhcmNoIHRleHRcclxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5jbGVhclNlYXJjaEZpbHRlcikge1xyXG4gICAgICB0aGlzLmZpbHRlci50ZXh0ID0gJyc7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uRHJvcERvd25DbG9zZS5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVTZWxlY3RBbGwoKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuaXNBbGxJdGVtc1NlbGVjdGVkKCkpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gdGhpcy5fZGF0YS5zbGljZSgpO1xyXG4gICAgICB0aGlzLm9uU2VsZWN0QWxsLmVtaXQodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5vbkRlU2VsZWN0QWxsLmVtaXQodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==