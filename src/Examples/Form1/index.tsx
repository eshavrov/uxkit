import React from "react";
import cn from "classnames";

import { Tabs } from "@components/Tabs";

import s from "./styles.module.css";
import { Group } from "@components/Group";
import { Fieldset } from "@components/Fieldset";
import { Field } from "@components/Field";
import { Autocomplete } from "@components/Autocomplete";
import { Checkbox } from "@components/Checkbox";
import { Checkboxes } from "@components/Checkboxes";
import { Input } from "@components/Input";
import { Select } from "@components/Select";
// import { Modal } from "./Modal";

const formatStreetAndNumber = (
  streetNumber?: number | string | null,
  streetName?: string | null,
  city?: string,
): string =>
  `${streetNumber ?? ''}${streetNumber ? ' ' : ''}${streetName ?? ''}${
    city ? `, ${city}` : ''
  }`;
const render = (item: any) => {
  const client = item.data || {};
  const { clientId, clientName, homeAddress } = client;

  const address = formatStreetAndNumber(
    homeAddress?.streetNumber,
    homeAddress?.streetName,
    homeAddress?.city,
  );

  // const serviceName = getServiceName(client?.service);

  return (
    <>
      <span>{clientName}</span>
      <span>{clientId || item.label}</span>
      <span>{address}</span>
    </>
    // <Row style={styles.clientRow} wrap={false}>
    //   <Col span={8} style={styles.clientBlock}>
    //     {clientName}
    //   </Col>
    //   <Col span={4} style={styles.clientBlock}>
    //     {clientId}
    //   </Col>
    //   {bookingServiceAllocationIsClient && (
    //     <Col span={2} style={{ ...styles.clientBlock, fontWeight: 700 }}>
    //       {serviceName}
    //     </Col>
    //   )}
    //   <Col flex={1} style={styles.clientBlock}>
    //     {address}
    //   </Col>
    // </Row>
  );
};;


export const Example1 = () => {
  const isDisabled = false;
  const $disabled = false;

  const serviceOptions = [{
    label: 'REGULAR',
    value: '1'
  }, {
    label: 'CERT',
    value: '2'
  }];

  const clientIdOptions = [{
    label: '10001',
    value: '1',

    data: {
      clientId: '10001', 
      clientName: 'Vasya',
      homeAddress: {
        streetNumber: '6',
        streetName: 'Mira',
        city: 'Novosibirsk'
      }
    },
  }, {
    label: '10002',
    value: '2',
    data: {
      clientId: '10002', 
      clientName: 'Katy',
      homeAddress: {
        streetNumber: '2',
        streetName: 'Lugovaya',
        city: 'Omsk'
      }
    },
  },{
    label: '10003',
    value: '3',    data: {
      clientId: '10003', 
      clientName: 'Lina',
      homeAddress: {
        streetNumber: '61',
        streetName: 'Mira',
        city: 'Novosibirsk'
      }
    },
  }, {
    label: '10007',
    value: '4',
    data: {
      clientId: '10007', 
      clientName: 'Tony',
      homeAddress: {
        streetNumber: '200',
        streetName: 'N BRAND AVE',
        city: 'Pasadena'
      }
    },
  },{
    label: '10021',
    value: '5',
    data: {
      clientId: '10021', 
      clientName: 'Rima',
      homeAddress: {
        streetNumber: '12',
        streetName: 'Mira',
        city: 'Vorkuta'
      }
    },
  }, {
    label: '10237',
    value: '6',
    data: {
      clientId: '10237', 
      clientName: 'Olga',
      homeAddress: {
        streetNumber: '16',
        streetName: 'Street',
        city: 'Glendale'
      }
    },
  }];

  const clientNameOptions = [{
    label: 'Vasya',
    value: '1'
  }, {
    label: 'Petya',
    value: '2'
  }];

  return (
    <>
      <form className="rjsf" noValidate={undefined}>
        <div className="form-group field field-object">
          <div>
            <Tabs
              defaultActiveKey="reservation"
              className={s.wrapper}
              items={[
                {
                  label: "Reservation",
                  key: "reservation",
                  className: s.reservationTab,
                  children: (
                    <>
                      <Group
                        className={s.clientGroup}
                        gridArea="clientGroup"
                      >
                        <Fieldset
                          bodyClassName={s.root}
                          gridArea="service"
                          legend="Service"
                          labelHidden
                        >
                          <Field id="service" label="Service" required >
                            <Select 
                              id=""
                              value=""
                              options={serviceOptions}
                              onChange={() => {}}
                            />
                          </Field>
                        </Fieldset>

                        <Fieldset
                          bodyClassName={s.rootClient}
                          gridArea="client"
                          legend="Client"
                          labelHidden
                          disabled={false}
                        >
                          <Field
                            className={s.clientId}
                            label="Client ID"
                            id="client.clientId"
                            required
                          >
                            <Autocomplete
                              asTable
                              aria-label="Client Id"
                              autocompleteType="list"
                              value=""
                              options={clientIdOptions}
                              onChange={() => {}}
                              // value={formData.$clientIdSearch ?? ''}
                              // onChange={onClientIdSearchChange}
                              // options={clientIdOptions}
                              // onEnter={onEnter}
                              render={render}
                              // onSelect={onClientSelect as any}
                              // disabled={isClientDisabled}
                              // openOnChange
                              // ref={autocompleteRef}
                              // {...defaultClientIdProps}
                            />
                          </Field>

                          <Field
                            className={s.clientName}
                            label="Name"
                            id="client.clientName"
                          >
                            <Autocomplete
                              aria-label="Client name"
                              autocompleteType="list"
                              value=""
                              options={clientNameOptions}
                              onChange={() => {}}
                              // value={formData.$clientName ?? ''}
                              // onChange={onClientNameChange}
                              // options={clientNameOptions}
                              // render={render}
                              // onSelect={onClientSelect as any}
                              // disabled={isClientDisabled}
                              // openOnChange
                              // {...defaultClientNameProps}
                            />
                          </Field>

                          <Field
                            className={s.clientPhone}
                            label="Phone"
                            id="client.phone"
                            readonly
                          >
                            <Input value="" disabled />
                          </Field>

                          <Field
                            className={s.clientNotes}
                            label="Notes"
                            id="client.notes"
                            readonly
                          >
                            <Input value="" disabled />
                          </Field>
                        </Fieldset>

                        <Fieldset
                          bodyClassName={s.root}
                          gridArea="trips"
                          legend="Trips"
                          labelHidden
                        >
                          <Field
                            className={s.clientNotes}
                            label="Trips"
                            id="trips"
                            labelOptional={
                              !isDisabled && (
                                <span
                                  className={s.shortcut}
                                  onClick={() => {}}
                                >
                                  [F4]
                                </span>
                              )
                            }
                            readonly
                          >
                            <Input value="" disabled />
                          </Field>
                        </Fieldset>

                        <Fieldset
                          bodyClassName={s.root}
                          gridArea="subscription"
                          legend="Subscription"
                          title={
                            <>
                              Subscription -{" "}
                              <span style={{ color: "red" }}>
                                Current On Hold From 01/25/25 To{" "}
                                03/12/25
                              </span>
                            </>
                          }
                          disabled={$disabled}
                        >
                          <div
                            className={cn(
                              s.effectiveFrom,
                              s.antFormItemBottomDisabler
                            )}
                          >
                            {/* {updateFormPropertyUiOptions(propertiesMap.effectiveFrom, {
          readonly: $disabled,
        })} */}
                          </div>

                          <div
                            className={cn(
                              s.effectiveTo,
                              s.antFormItemBottomDisabler
                            )}
                          >
                            {/* {updateFormPropertyUiOptions(propertiesMap.effectiveTo, {
          readonly: $disabled,
        })} */}
                          </div>

                          <Field
                            className={s.dayOfTheWeek}
                            label="Day Of The Week"
                            id="dayOfTheWeek"
                            labelHidden
                          >
                            <Checkboxes
                              columns={[]}
                              value={{}}
                              onChange={() => {}}
                              disabled={$disabled}
                            />
                          </Field>

                          <div className={s.block}>
                            <div
                              className={cn(
                                s.annualHolidays,
                                s.antFormItemBottomDisabler
                              )}
                            >
                              {/* {updateFormPropertyUiOptions(propertiesMap.annualHolidays, {
            readonly: $disabled,
          })} */}
                            </div>

                            <Field
                              className={s.applyHolidayShift}
                              label="Apply Holiday Shift"
                              id="applyHolidayShift"
                              labelHidden
                            >
                              <Checkbox
                                checked={true}
                                onChange={() => {}}
                                disabled={$disabled}
                              >
                                Apply Holiday Shift
                              </Checkbox>
                            </Field>
                          </div>
                        </Fieldset>

                        <fieldset
                          className="web-src-uikit2-Fieldset-Fieldset-module__root"
                          disabled={undefined}
                          style={{ gridArea: "subscription" }}
                        >
                          <legend className="web-src-uikit2-Fieldset-Fieldset-module__legend">
                            Subscription
                          </legend>
                          <header className="web-src-uikit2-Fieldset-Fieldset-module__header">
                            <span>Subscription</span>
                          </header>
                          <div className="web-src-uikit2-Fieldset-Fieldset-module__body web-src-pods-tripSto-custom-groups-Subscription-SubscriptionGroup-module__root">
                            <div className="web-src-pods-tripSto-custom-groups-Subscription-SubscriptionGroup-module__effectiveFrom web-src-pods-tripSto-custom-groups-Subscription-SubscriptionGroup-module__antFormItemBottomDisabler">
                              <div className="form-group field field-string">
                                <label
                                  className="control-label"
                                  htmlFor="root_effectiveFrom"
                                >
                                  Effective From
                                </label>
                                <div className="ant-form-item web-src-framework-widgets-dateTimeWidgets-DateTimeSplitWidget-DateTimeSplitWidget-module__date">
                                  <div className="ant-row ant-form-item-row">
                                    <div className="ant-col ant-form-item-control">
                                      <div className="ant-form-item-control-input">
                                        <div className="ant-form-item-control-input-content">
                                          <div
                                            style={{
                                              display: "flex",
                                            }}
                                          >
                                            <div
                                              className="ant-picker ant-picker-disabled"
                                              style={{
                                                width: "100%",
                                              }}
                                            >
                                              <div className="ant-picker-input">
                                                <input
                                                  id="root_effectiveFrom"
                                                  disabled={
                                                    undefined
                                                  }
                                                  readOnly={
                                                    undefined
                                                  }
                                                  placeholder="MM/DD/YY"
                                                  title=""
                                                  size={12}
                                                  autoComplete="off"
                                                  value=""
                                                />
                                                <span className="ant-picker-suffix">
                                                  <span
                                                    role="img"
                                                    aria-label="calendar"
                                                    tabIndex={-1}
                                                    className="anticon anticon-calendar"
                                                  >
                                                    <svg
                                                      viewBox="64 64 896 896"
                                                      focusable="false"
                                                      data-icon="calendar"
                                                      width="1em"
                                                      height="1em"
                                                      fill="currentColor"
                                                      aria-hidden="true"
                                                    >
                                                      <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
                                                    </svg>
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="web-src-pods-tripSto-custom-groups-Subscription-SubscriptionGroup-module__effectiveTo web-src-pods-tripSto-custom-groups-Subscription-SubscriptionGroup-module__antFormItemBottomDisabler">
                              <div className="form-group field field-string">
                                <label
                                  className="control-label"
                                  htmlFor="root_effectiveTo"
                                >
                                  Effective To
                                </label>
                                <div className="ant-form-item web-src-framework-widgets-dateTimeWidgets-DateTimeSplitWidget-DateTimeSplitWidget-module__date">
                                  <div className="ant-row ant-form-item-row">
                                    <div className="ant-col ant-form-item-control">
                                      <div className="ant-form-item-control-input">
                                        <div className="ant-form-item-control-input-content">
                                          <div
                                            style={{
                                              display: "flex",
                                            }}
                                          >
                                            <div
                                              className="ant-picker ant-picker-disabled"
                                              style={{
                                                width: "100%",
                                              }}
                                            >
                                              <div className="ant-picker-input">
                                                <input
                                                  id="root_effectiveTo"
                                                  disabled={
                                                    undefined
                                                  }
                                                  readOnly={
                                                    undefined
                                                  }
                                                  placeholder="MM/DD/YY"
                                                  title=""
                                                  size={12}
                                                  autoComplete="off"
                                                  value=""
                                                />
                                                <span className="ant-picker-suffix">
                                                  <span
                                                    role="img"
                                                    aria-label="calendar"
                                                    tabIndex={-1}
                                                    className="anticon anticon-calendar"
                                                  >
                                                    <svg
                                                      viewBox="64 64 896 896"
                                                      focusable="false"
                                                      data-icon="calendar"
                                                      width="1em"
                                                      height="1em"
                                                      fill="currentColor"
                                                      aria-hidden="true"
                                                    >
                                                      <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
                                                    </svg>
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="web-src-uikit2-Field-Field-module__root web-src-pods-tripSto-custom-groups-Subscription-SubscriptionGroup-module__dayOfTheWeek">
                              <label
                                className="web-src-uikit2-Field-Field-module__label web-src-uikit2-Field-Field-module__labelHidden"
                                htmlFor="dayOfTheWeek"
                              >
                                Day Of The Week
                              </label>
                              <table
                                className="web-src-uikit2-Checkboxes-Checkboxes-module__table web-src-uikit2-Checkboxes-Checkboxes-module__disabled"
                                role="presentation"
                              >
                                <thead className="web-src-uikit2-Checkboxes-Checkboxes-module__thead">
                                  <tr className="web-src-uikit2-Checkboxes-Checkboxes-module__headers web-src-uikit2-Checkboxes-Checkboxes-module__disabled">
                                    <th className="web-src-uikit2-Checkboxes-Checkboxes-module__th">
                                      Sun
                                    </th>
                                    <th className="web-src-uikit2-Checkboxes-Checkboxes-module__th">
                                      Mon
                                    </th>
                                    <th className="web-src-uikit2-Checkboxes-Checkboxes-module__th">
                                      Tue
                                    </th>
                                    <th className="web-src-uikit2-Checkboxes-Checkboxes-module__th">
                                      Wed
                                    </th>
                                    <th className="web-src-uikit2-Checkboxes-Checkboxes-module__th">
                                      Thu
                                    </th>
                                    <th className="web-src-uikit2-Checkboxes-Checkboxes-module__th">
                                      Fri
                                    </th>
                                    <th className="web-src-uikit2-Checkboxes-Checkboxes-module__th">
                                      Sat
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="web-src-uikit2-Checkboxes-Checkboxes-module__tbody">
                                  <tr className="web-src-uikit2-Checkboxes-Checkboxes-module__tr">
                                    <td className="web-src-uikit2-Checkboxes-Checkboxes-module__td">
                                      <span className="web-src-uikit2-Checkbox-Checkbox-module__root web-src-uikit2-Checkboxes-Checkboxes-module__checkbox web-src-uikit2-Checkbox-Checkbox-module__disabled">
                                        <input
                                          aria-label="Sunday"
                                          aria-describedby="dayOfTheWeek"
                                          className="web-src-uikit2-Checkbox-Checkbox-module__input"
                                          disabled={undefined}
                                          type="checkbox"
                                          value=""
                                        />
                                        <span className="web-src-uikit2-Checkbox-Checkbox-module__inner"></span>
                                      </span>
                                    </td>
                                    <td className="web-src-uikit2-Checkboxes-Checkboxes-module__td">
                                      <span className="web-src-uikit2-Checkbox-Checkbox-module__root web-src-uikit2-Checkboxes-Checkboxes-module__checkbox web-src-uikit2-Checkbox-Checkbox-module__disabled">
                                        <input
                                          aria-label="Monday"
                                          aria-describedby="dayOfTheWeek"
                                          className="web-src-uikit2-Checkbox-Checkbox-module__input"
                                          disabled={undefined}
                                          type="checkbox"
                                          value=""
                                        />
                                        <span className="web-src-uikit2-Checkbox-Checkbox-module__inner"></span>
                                      </span>
                                    </td>
                                    <td className="web-src-uikit2-Checkboxes-Checkboxes-module__td">
                                      <span className="web-src-uikit2-Checkbox-Checkbox-module__root web-src-uikit2-Checkboxes-Checkboxes-module__checkbox web-src-uikit2-Checkbox-Checkbox-module__disabled">
                                        <input
                                          aria-label="Tuesday"
                                          aria-describedby="dayOfTheWeek"
                                          className="web-src-uikit2-Checkbox-Checkbox-module__input"
                                          disabled={undefined}
                                          type="checkbox"
                                          value=""
                                        />
                                        <span className="web-src-uikit2-Checkbox-Checkbox-module__inner"></span>
                                      </span>
                                    </td>
                                    <td className="web-src-uikit2-Checkboxes-Checkboxes-module__td">
                                      <span className="web-src-uikit2-Checkbox-Checkbox-module__root web-src-uikit2-Checkboxes-Checkboxes-module__checkbox web-src-uikit2-Checkbox-Checkbox-module__disabled">
                                        <input
                                          aria-label="Wednesday"
                                          aria-describedby="dayOfTheWeek"
                                          className="web-src-uikit2-Checkbox-Checkbox-module__input"
                                          disabled={undefined}
                                          type="checkbox"
                                          value=""
                                        />
                                        <span className="web-src-uikit2-Checkbox-Checkbox-module__inner"></span>
                                      </span>
                                    </td>
                                    <td className="web-src-uikit2-Checkboxes-Checkboxes-module__td">
                                      <span className="web-src-uikit2-Checkbox-Checkbox-module__root web-src-uikit2-Checkboxes-Checkboxes-module__checkbox web-src-uikit2-Checkbox-Checkbox-module__disabled">
                                        <input
                                          aria-label="Thursday"
                                          aria-describedby="dayOfTheWeek"
                                          className="web-src-uikit2-Checkbox-Checkbox-module__input"
                                          disabled={undefined}
                                          type="checkbox"
                                          value=""
                                        />
                                        <span className="web-src-uikit2-Checkbox-Checkbox-module__inner"></span>
                                      </span>
                                    </td>
                                    <td className="web-src-uikit2-Checkboxes-Checkboxes-module__td">
                                      <span className="web-src-uikit2-Checkbox-Checkbox-module__root web-src-uikit2-Checkboxes-Checkboxes-module__checkbox web-src-uikit2-Checkbox-Checkbox-module__disabled">
                                        <input
                                          aria-label="Friday"
                                          aria-describedby="dayOfTheWeek"
                                          className="web-src-uikit2-Checkbox-Checkbox-module__input"
                                          disabled={undefined}
                                          type="checkbox"
                                          value=""
                                        />
                                        <span className="web-src-uikit2-Checkbox-Checkbox-module__inner"></span>
                                      </span>
                                    </td>
                                    <td className="web-src-uikit2-Checkboxes-Checkboxes-module__td">
                                      <span className="web-src-uikit2-Checkbox-Checkbox-module__root web-src-uikit2-Checkboxes-Checkboxes-module__checkbox web-src-uikit2-Checkbox-Checkbox-module__disabled">
                                        <input
                                          aria-label="Saturday"
                                          aria-describedby="dayOfTheWeek"
                                          className="web-src-uikit2-Checkbox-Checkbox-module__input"
                                          disabled={undefined}
                                          type="checkbox"
                                          value=""
                                        />
                                        <span className="web-src-uikit2-Checkbox-Checkbox-module__inner"></span>
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="web-src-pods-tripSto-custom-groups-Subscription-SubscriptionGroup-module__block">
                              <div className="web-src-pods-tripSto-custom-groups-Subscription-SubscriptionGroup-module__annualHolidays web-src-pods-tripSto-custom-groups-Subscription-SubscriptionGroup-module__antFormItemBottomDisabler">
                                <div className="form-group field field-array">
                                  <label htmlFor="AnnualHoliday-annualHolidays">
                                    Cancel on Holidays
                                  </label>
                                  <div className="ant-form-item">
                                    <div className="ant-row ant-form-item-row">
                                      <div className="ant-col ant-form-item-control">
                                        <div className="ant-form-item-control-input">
                                          <div className="ant-form-item-control-input-content">
                                            <div className="ant-select ant-select-in-form-item ant-select-multiple ant-select-allow-clear ant-select-disabled ant-select-show-search">
                                              <div className="ant-select-selector">
                                                <div className="ant-select-selection-overflow">
                                                  <div
                                                    className="ant-select-selection-overflow-item ant-select-selection-overflow-item-suffix"
                                                    style={{
                                                      opacity: 1,
                                                    }}
                                                  >
                                                    <div
                                                      className="ant-select-selection-search"
                                                      style={{
                                                        width:
                                                                      "4px",
                                                      }}
                                                    >
                                                      <input
                                                        type="search"
                                                        id="AnnualHoliday-annualHolidays"
                                                        disabled={
                                                          undefined
                                                        }
                                                        autoComplete="off"
                                                        className="ant-select-selection-search-input"
                                                        role="combobox"
                                                        aria-expanded="false"
                                                        aria-haspopup="listbox"
                                                        aria-owns="AnnualHoliday-annualHolidays_list"
                                                        aria-autocomplete="list"
                                                        aria-controls="AnnualHoliday-annualHolidays_list"
                                                        aria-activedescendant="AnnualHoliday-annualHolidays_list_0"
                                                        readOnly={
                                                          undefined
                                                        }
                                                        unselectable="on"
                                                        value=""
                                                        style={{
                                                          opacity: 0,
                                                        }}
                                                      />
                                                      <span
                                                        className="ant-select-selection-search-mirror"
                                                        aria-hidden="true"
                                                      >
                                                                    &nbsp;
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <span className="ant-select-selection-placeholder">
                                                  - NONE -
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="web-src-uikit2-Field-Field-module__root web-src-pods-tripSto-custom-groups-Subscription-SubscriptionGroup-module__applyHolidayShift">
                                <label
                                  className="web-src-uikit2-Field-Field-module__label web-src-uikit2-Field-Field-module__labelHidden"
                                  htmlFor="applyHolidayShift"
                                >
                                  Apply Holiday Shift
                                </label>
                                <label className="web-src-uikit2-Checkbox-Checkbox-module__wrapper web-src-uikit2-Checkbox-Checkbox-module__wrapperDisabled">
                                  <span className="web-src-uikit2-Checkbox-Checkbox-module__root web-src-uikit2-Checkbox-Checkbox-module__disabled web-src-uikit2-Checkbox-Checkbox-module__inside">
                                    <input
                                      aria-describedby="applyHolidayShift-errors"
                                      className="web-src-uikit2-Checkbox-Checkbox-module__input"
                                      disabled={undefined}
                                      id="applyHolidayShift"
                                      type="checkbox"
                                      value=""
                                    />
                                    <span className="web-src-uikit2-Checkbox-Checkbox-module__inner"></span>
                                  </span>
                                  <span className="web-src-uikit2-Checkbox-Checkbox-module__span">
                                    Apply Holiday Shift
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </Group>

                      <div
                        tabIndex={-1}
                        className="web-src-podsCommon-CompoundAddress-Address-module__hotKeys"
                        style={{ gridArea: "pickup" }}
                      >
                        <div className="web-src-podsCommon-CompoundAddress-Address-module__observeKeys">
                          <fieldset className="web-src-uikit2-Fieldset-Fieldset-module__root web-src-podsCommon-CompoundAddress-Address-module__fieldset">
                            <legend className="web-src-uikit2-Fieldset-Fieldset-module__legend">
                              From
                            </legend>
                            <header className="web-src-uikit2-Fieldset-Fieldset-module__header">
                              <div className="ant-row ant-row-space-between">
                                <div className="ant-col">
                                  <div
                                    className="ant-row"
                                    style={{
                                      marginLeft: "-4px",
                                      marginRight: "-4px",
                                    }}
                                  >
                                    <div
                                      className="ant-col"
                                      style={{
                                        paddingLeft: "4px",
                                        paddingRight: "4px",
                                      }}
                                    >
                                      From
                                    </div>
                                  </div>
                                </div>
                                <div className="ant-col">
                                  <button
                                    title="Show address on the map"
                                    tabIndex={-1}
                                    type="button"
                                    className="ant-btn ant-btn-text ant-btn-icon-only"
                                    style={{
                                      cursor: "pointer",
                                      padding: "0px",
                                      height: "auto",
                                      width: "auto",
                                    }}
                                  >
                                    <span
                                      role="img"
                                      aria-label="arrow-right"
                                      className="anticon anticon-arrow-right"
                                    ></span>
                                  </button>
                                </div>
                              </div>
                            </header>
                            <div className="web-src-uikit2-Fieldset-Fieldset-module__body web-src-pods-tripTemplate-custom-groups-Addresses-Addresses-module__address">
                              <div className="web-src-uikit2-Field-Field-module__root web-src-podsCommon-CompoundAddress-Address-module__street">
                                <label
                                  className="web-src-uikit2-Field-Field-module__label"
                                  htmlFor="p.x"
                                >
                                  Strееt Addrеss
                                </label>
                                <div
                                  className="ant-select ant-select-auto-complete ant-select-single ant-select-allow-clear ant-select-disabled ant-select-customize-input ant-select-show-search"
                                  // inputref="[object Object]"
                                  spellCheck="false"
                                  aria-describedby="p.x-errors"
                                  style={{ width: "100%" }}
                                >
                                  <div className="ant-select-selector">
                                    <span className="ant-select-selection-search">
                                      <input
                                        autoComplete="off"
                                        spellCheck="false"
                                        type="search"
                                        id="p.x"
                                        role="combobox"
                                        aria-expanded="false"
                                        aria-haspopup="listbox"
                                        aria-owns="p.x_list"
                                        aria-autocomplete="list"
                                        aria-controls="p.x_list"
                                        aria-activedescendant="p.x_list_0"
                                        aria-describedby="p.x-errors"
                                        disabled={undefined}
                                        className="ant-input ant-input-disabled ant-select-selection-search-input"
                                        value=""
                                      />
                                    </span>
                                    <span className="ant-select-selection-placeholder"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="web-src-uikit2-Field-Field-module__root">
                                <label
                                  className="web-src-uikit2-Field-Field-module__label"
                                  htmlFor="p.xx"
                                >
                                  Сity
                                </label>
                                <div
                                  className="ant-select ant-select-auto-complete web-src-podsCommon-CompoundAddress-Address-module__city ant-select-single ant-select-allow-clear ant-select-disabled ant-select-customize-input ant-select-show-search"
                                  spellCheck="false"
                                  aria-describedby="p.xx-errors"
                                  style={{ width: "100%" }}
                                >
                                  <div className="ant-select-selector">
                                    <span className="ant-select-selection-search">
                                      <input
                                        autoComplete="off"
                                        spellCheck="false"
                                        type="search"
                                        id="p.xx"
                                        role="combobox"
                                        aria-expanded="false"
                                        aria-haspopup="listbox"
                                        aria-owns="p.xx_list"
                                        aria-autocomplete="list"
                                        aria-controls="p.xx_list"
                                        aria-activedescendant="p.xx_list_0"
                                        aria-describedby="p.xx-errors"
                                        disabled={undefined}
                                        className="ant-input ant-input-disabled ant-select-selection-search-input"
                                        value=""
                                      />
                                    </span>
                                    <span className="ant-select-selection-placeholder"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="web-src-uikit2-Field-Field-module__root web-src-podsCommon-CompoundAddress-Address-module__unit">
                                <label
                                  className="web-src-uikit2-Field-Field-module__label"
                                  htmlFor="p.xxx"
                                >
                                  Unit
                                </label>
                                <span className="ant-input-affix-wrapper ant-input-affix-wrapper-disabled">
                                  <input
                                    autoComplete="off"
                                    id="p.xxx"
                                    aria-describedby="p.xxx-errors"
                                    disabled={undefined}
                                    className="ant-input ant-input-disabled"
                                    type="text"
                                    value=""
                                  />
                                  <span className="ant-input-suffix">
                                    <span
                                      className="ant-input-clear-icon ant-input-clear-icon-hidden"
                                      role="button"
                                      tabIndex={-1}
                                    >
                                      <span
                                        role="img"
                                        aria-label="close-circle"
                                        className="anticon anticon-close-circle"
                                      >
                                        <svg
                                          fill-rule="evenodd"
                                          viewBox="64 64 896 896"
                                          focusable="false"
                                          data-icon="close-circle"
                                          width="1em"
                                          height="1em"
                                          fill="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                                        </svg>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </div>
                              <div className="web-src-uikit2-Field-Field-module__root web-src-podsCommon-CompoundAddress-Address-module__cross">
                                <label
                                  className="web-src-uikit2-Field-Field-module__label"
                                  htmlFor="p.xxxxx"
                                >
                                  X Strееt
                                </label>
                                <span className="ant-input-affix-wrapper ant-input-affix-wrapper-disabled">
                                  <input
                                    autoComplete="off"
                                    id="p.xxxxx"
                                    aria-describedby="p.xxxxx-errors"
                                    disabled={undefined}
                                    className="ant-input ant-input-disabled"
                                    type="text"
                                    value=""
                                  />
                                  <span className="ant-input-suffix">
                                    <span
                                      className="ant-input-clear-icon ant-input-clear-icon-hidden"
                                      role="button"
                                      tabIndex={-1}
                                    >
                                      <span
                                        role="img"
                                        aria-label="close-circle"
                                        className="anticon anticon-close-circle"
                                      >
                                        <svg
                                          fill-rule="evenodd"
                                          viewBox="64 64 896 896"
                                          focusable="false"
                                          data-icon="close-circle"
                                          width="1em"
                                          height="1em"
                                          fill="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                                        </svg>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </div>
                              <div className="web-src-uikit2-Field-Field-module__root web-src-podsCommon-CompoundAddress-Address-module__instruction">
                                <label
                                  className="web-src-uikit2-Field-Field-module__label"
                                  htmlFor="p.xxxxxx"
                                >
                                  Addrеss Instruction
                                </label>
                                <div
                                  className="ant-select ant-select-auto-complete ant-select-single ant-select-allow-clear ant-select-disabled ant-select-customize-input ant-select-show-search"
                                  aria-describedby="p.xxxxxx-errors"
                                  style={{ width: "100%" }}
                                >
                                  <div className="ant-select-selector">
                                    <span className="ant-select-selection-search">
                                      <input
                                        autoComplete="off"
                                        spellCheck="false"
                                        type="search"
                                        id="p.xxxxxx"
                                        role="combobox"
                                        aria-expanded="false"
                                        aria-haspopup="listbox"
                                        aria-owns="p.xxxxxx_list"
                                        aria-autocomplete="list"
                                        aria-controls="p.xxxxxx_list"
                                        aria-activedescendant="p.xxxxxx_list_0"
                                        aria-describedby="p.xxxxxx-errors"
                                        disabled={undefined}
                                        className="ant-input ant-input-disabled ant-select-selection-search-input"
                                        value=""
                                      />
                                    </span>
                                    <span className="ant-select-selection-placeholder"></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                      <div
                        tabIndex={-1}
                        className="web-src-podsCommon-CompoundAddress-Address-module__hotKeys"
                        style={{ gridArea: "dropoff" }}
                      >
                        <div className="web-src-podsCommon-CompoundAddress-Address-module__observeKeys">
                          <fieldset className="web-src-uikit2-Fieldset-Fieldset-module__root web-src-podsCommon-CompoundAddress-Address-module__fieldset">
                            <legend className="web-src-uikit2-Fieldset-Fieldset-module__legend">
                              To
                            </legend>
                            <header className="web-src-uikit2-Fieldset-Fieldset-module__header">
                              <div className="ant-row ant-row-space-between">
                                <div className="ant-col">
                                  <div
                                    className="ant-row"
                                    style={{
                                      marginLeft: "-4px",
                                      marginRight: "-4px",
                                    }}
                                  >
                                    <div
                                      className="ant-col"
                                      style={{
                                        paddingLeft: "4px",
                                        paddingRight: "4px",
                                      }}
                                    >
                                      To
                                    </div>
                                  </div>
                                </div>
                                <div className="ant-col">
                                  <button
                                    title="Show address on the map"
                                    tabIndex={-1}
                                    type="button"
                                    className="ant-btn ant-btn-text ant-btn-icon-only"
                                    style={{
                                      cursor: "pointer",
                                      padding: "0px",
                                      height: "auto",
                                      width: "auto",
                                    }}
                                  >
                                    <span
                                      role="img"
                                      aria-label="arrow-right"
                                      className="anticon anticon-arrow-right"
                                    ></span>
                                  </button>
                                </div>
                              </div>
                            </header>
                            <div className="web-src-uikit2-Fieldset-Fieldset-module__body web-src-pods-tripTemplate-custom-groups-Addresses-Addresses-module__address">
                              <div className="web-src-uikit2-Field-Field-module__root web-src-podsCommon-CompoundAddress-Address-module__street">
                                <label
                                  className="web-src-uikit2-Field-Field-module__label"
                                  htmlFor="d.x"
                                >
                                  Strееt Addrеss
                                </label>
                                <div
                                  className="ant-select ant-select-auto-complete ant-select-single ant-select-allow-clear ant-select-disabled ant-select-customize-input ant-select-show-search"
                                  // inputref="[object Object]"
                                  spellCheck="false"
                                  aria-describedby="d.x-errors"
                                  style={{ width: "100%" }}
                                >
                                  <div className="ant-select-selector">
                                    <span className="ant-select-selection-search">
                                      <input
                                        autoComplete="off"
                                        spellCheck="false"
                                        type="search"
                                        id="d.x"
                                        role="combobox"
                                        aria-expanded="false"
                                        aria-haspopup="listbox"
                                        aria-owns="d.x_list"
                                        aria-autocomplete="list"
                                        aria-controls="d.x_list"
                                        aria-activedescendant="d.x_list_0"
                                        aria-describedby="d.x-errors"
                                        disabled={undefined}
                                        className="ant-input ant-input-disabled ant-select-selection-search-input"
                                        value=""
                                      />
                                    </span>
                                    <span className="ant-select-selection-placeholder"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="web-src-uikit2-Field-Field-module__root">
                                <label
                                  className="web-src-uikit2-Field-Field-module__label"
                                  htmlFor="d.xx"
                                >
                                  Сity
                                </label>
                                <div
                                  className="ant-select ant-select-auto-complete web-src-podsCommon-CompoundAddress-Address-module__city ant-select-single ant-select-allow-clear ant-select-disabled ant-select-customize-input ant-select-show-search"
                                  spellCheck="false"
                                  aria-describedby="d.xx-errors"
                                  style={{ width: "100%" }}
                                >
                                  <div className="ant-select-selector">
                                    <span className="ant-select-selection-search">
                                      <input
                                        autoComplete="off"
                                        spellCheck="false"
                                        type="search"
                                        id="d.xx"
                                        role="combobox"
                                        aria-expanded="false"
                                        aria-haspopup="listbox"
                                        aria-owns="d.xx_list"
                                        aria-autocomplete="list"
                                        aria-controls="d.xx_list"
                                        aria-activedescendant="d.xx_list_0"
                                        aria-describedby="d.xx-errors"
                                        disabled={undefined}
                                        className="ant-input ant-input-disabled ant-select-selection-search-input"
                                        value=""
                                      />
                                    </span>
                                    <span className="ant-select-selection-placeholder"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="web-src-uikit2-Field-Field-module__root web-src-podsCommon-CompoundAddress-Address-module__unit">
                                <label
                                  className="web-src-uikit2-Field-Field-module__label"
                                  htmlFor="d.xxx"
                                >
                                  Unit
                                </label>
                                <span className="ant-input-affix-wrapper ant-input-affix-wrapper-disabled">
                                  <input
                                    autoComplete="off"
                                    id="d.xxx"
                                    aria-describedby="d.xxx-errors"
                                    disabled={undefined}
                                    className="ant-input ant-input-disabled"
                                    type="text"
                                    value=""
                                  />
                                  <span className="ant-input-suffix">
                                    <span
                                      className="ant-input-clear-icon ant-input-clear-icon-hidden"
                                      role="button"
                                      tabIndex={-1}
                                    >
                                      <span
                                        role="img"
                                        aria-label="close-circle"
                                        className="anticon anticon-close-circle"
                                      >
                                        <svg
                                          fill-rule="evenodd"
                                          viewBox="64 64 896 896"
                                          focusable="false"
                                          data-icon="close-circle"
                                          width="1em"
                                          height="1em"
                                          fill="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                                        </svg>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </div>
                              <div className="web-src-uikit2-Field-Field-module__root web-src-podsCommon-CompoundAddress-Address-module__cross">
                                <label
                                  className="web-src-uikit2-Field-Field-module__label"
                                  htmlFor="d.xxxxx"
                                >
                                  X Strееt
                                </label>
                                <span className="ant-input-affix-wrapper ant-input-affix-wrapper-disabled">
                                  <input
                                    autoComplete="off"
                                    id="d.xxxxx"
                                    aria-describedby="d.xxxxx-errors"
                                    disabled={undefined}
                                    className="ant-input ant-input-disabled"
                                    type="text"
                                    value=""
                                  />
                                  <span className="ant-input-suffix">
                                    <span
                                      className="ant-input-clear-icon ant-input-clear-icon-hidden"
                                      role="button"
                                      tabIndex={-1}
                                    >
                                      <span
                                        role="img"
                                        aria-label="close-circle"
                                        className="anticon anticon-close-circle"
                                      >
                                        <svg
                                          fill-rule="evenodd"
                                          viewBox="64 64 896 896"
                                          focusable="false"
                                          data-icon="close-circle"
                                          width="1em"
                                          height="1em"
                                          fill="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                                        </svg>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </div>
                              <div className="web-src-uikit2-Field-Field-module__root web-src-podsCommon-CompoundAddress-Address-module__instruction">
                                <label
                                  className="web-src-uikit2-Field-Field-module__label"
                                  htmlFor="d.xxxxxx"
                                >
                                  Addrеss Instruction
                                </label>
                                <div
                                  className="ant-select ant-select-auto-complete ant-select-single ant-select-allow-clear ant-select-disabled ant-select-customize-input ant-select-show-search"
                                  aria-describedby="d.xxxxxx-errors"
                                  style={{ width: "100%" }}
                                >
                                  <div className="ant-select-selector">
                                    <span className="ant-select-selection-search">
                                      <input
                                        autoComplete="off"
                                        spellCheck="false"
                                        type="search"
                                        id="d.xxxxxx"
                                        role="combobox"
                                        aria-expanded="false"
                                        aria-haspopup="listbox"
                                        aria-owns="d.xxxxxx_list"
                                        aria-autocomplete="list"
                                        aria-controls="d.xxxxxx_list"
                                        aria-activedescendant="d.xxxxxx_list_0"
                                        aria-describedby="d.xxxxxx-errors"
                                        disabled={undefined}
                                        className="ant-input ant-input-disabled ant-select-selection-search-input"
                                        value=""
                                      />
                                    </span>
                                    <span className="ant-select-selection-placeholder"></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                      <fieldset
                        className="web-src-uikit2-Fieldset-Fieldset-module__root"
                        disabled={undefined}
                        style={{ gridArea: "loadItems" }}
                      >
                        <legend className="web-src-uikit2-Fieldset-Fieldset-module__legend">
                          Passengers Load
                        </legend>
                        <div className="web-src-uikit2-Fieldset-Fieldset-module__body web-src-pods-tripTemplate-custom-groups-PassengersLoad-PassengersLoadGroup-module__root">
                          <div className="web-src-uikit2-Field-Field-module__root web-src-pods-tripTemplate-custom-groups-PassengersLoad-PassengersLoadGroup-module__totalPax">
                            <label
                              className="web-src-uikit2-Field-Field-module__label"
                              htmlFor="auxPassengerNumber"
                            >
                              Total PAX
                            </label>
                            <div
                              className="ant-input-number ant-input-number-disabled"
                              style={{ width: "100%" }}
                            >
                              <div className="ant-input-number-handler-wrap">
                                <span
                                  unselectable="on"
                                  role="button"
                                  aria-label="Increase Value"
                                  aria-disabled="false"
                                  className="ant-input-number-handler ant-input-number-handler-up"
                                >
                                  <span
                                    role="img"
                                    aria-label="up"
                                    className="anticon anticon-up ant-input-number-handler-up-inner"
                                  >
                                    <svg
                                      viewBox="64 64 896 896"
                                      focusable="false"
                                      data-icon="up"
                                      width="1em"
                                      height="1em"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
                                    </svg>
                                  </span>
                                </span>
                                <span
                                  unselectable="on"
                                  role="button"
                                  aria-label="Decrease Value"
                                  aria-disabled="true"
                                  className="ant-input-number-handler ant-input-number-handler-down ant-input-number-handler-down-disabled"
                                >
                                  <span
                                    role="img"
                                    aria-label="down"
                                    className="anticon anticon-down ant-input-number-handler-down-inner"
                                  >
                                    <svg
                                      viewBox="64 64 896 896"
                                      focusable="false"
                                      data-icon="down"
                                      width="1em"
                                      height="1em"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                    </svg>
                                  </span>
                                </span>
                              </div>
                              <div className="ant-input-number-input-wrap">
                                <input
                                  autoComplete="off"
                                  role="spinbutton"
                                  aria-valuemin={1}
                                  aria-valuemax={3}
                                  aria-valuenow={1}
                                  step="1"
                                  id="auxPassengerNumber"
                                  aria-describedby="auxPassengerNumber-errors"
                                  className="ant-input-number-input"
                                  disabled={undefined}
                                  value="1"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="web-src-uikit2-Field-Field-module__root">
                            <label
                              className="web-src-uikit2-Field-Field-module__label"
                              htmlFor="auxPassengerPca"
                            >
                              PCA
                            </label>
                            <span className="web-src-uikit2-Checkbox-Checkbox-module__root web-src-uikit2-Checkbox-Checkbox-module__disabled web-src-uikit2-Checkbox-Checkbox-module__inside">
                              <input
                                aria-describedby="auxPassengerPca-errors"
                                className="web-src-uikit2-Checkbox-Checkbox-module__input"
                                disabled={undefined}
                                id="auxPassengerPca"
                                type="checkbox"
                                value=""
                              />
                              <span className="web-src-uikit2-Checkbox-Checkbox-module__inner"></span>
                            </span>
                          </div>
                          <div className="web-src-uikit2-Field-Field-module__root web-src-pods-tripTemplate-custom-groups-PassengersLoad-PassengersLoadGroup-module__free">
                            <label
                              className="web-src-uikit2-Field-Field-module__label"
                              htmlFor="auxPassengerFree"
                            >
                              Free
                            </label>
                            <div
                              className="ant-input-number ant-input-number-disabled"
                              style={{ width: "100%" }}
                            >
                              <div className="ant-input-number-handler-wrap">
                                <span
                                  unselectable="on"
                                  role="button"
                                  aria-label="Increase Value"
                                  aria-disabled="false"
                                  className="ant-input-number-handler ant-input-number-handler-up"
                                >
                                  <span
                                    role="img"
                                    aria-label="up"
                                    className="anticon anticon-up ant-input-number-handler-up-inner"
                                  >
                                    <svg
                                      viewBox="64 64 896 896"
                                      focusable="false"
                                      data-icon="up"
                                      width="1em"
                                      height="1em"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
                                    </svg>
                                  </span>
                                </span>
                                <span
                                  unselectable="on"
                                  role="button"
                                  aria-label="Decrease Value"
                                  aria-disabled="true"
                                  className="ant-input-number-handler ant-input-number-handler-down ant-input-number-handler-down-disabled"
                                >
                                  <span
                                    role="img"
                                    aria-label="down"
                                    className="anticon anticon-down ant-input-number-handler-down-inner"
                                  >
                                    <svg
                                      viewBox="64 64 896 896"
                                      focusable="false"
                                      data-icon="down"
                                      width="1em"
                                      height="1em"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                    </svg>
                                  </span>
                                </span>
                              </div>
                              <div className="ant-input-number-input-wrap">
                                <input
                                  autoComplete="off"
                                  role="spinbutton"
                                  aria-valuemin={0}
                                  aria-valuenow={0}
                                  step="1"
                                  id="auxPassengerFree"
                                  aria-describedby="auxPassengerFree-errors"
                                  className="ant-input-number-input"
                                  disabled={undefined}
                                  value="0"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="web-src-uikit2-Field-Field-module__root web-src-pods-tripTemplate-custom-groups-PassengersLoad-PassengersLoadGroup-module__animal">
                            <label
                              className="web-src-uikit2-Field-Field-module__label"
                              htmlFor="numAnimals"
                            >
                              Animal
                            </label>
                            <div
                              className="ant-input-number ant-input-number-disabled"
                              style={{ width: "100%" }}
                            >
                              <div className="ant-input-number-handler-wrap">
                                <span
                                  unselectable="on"
                                  role="button"
                                  aria-label="Increase Value"
                                  aria-disabled="false"
                                  className="ant-input-number-handler ant-input-number-handler-up"
                                >
                                  <span
                                    role="img"
                                    aria-label="up"
                                    className="anticon anticon-up ant-input-number-handler-up-inner"
                                  >
                                    <svg
                                      viewBox="64 64 896 896"
                                      focusable="false"
                                      data-icon="up"
                                      width="1em"
                                      height="1em"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
                                    </svg>
                                  </span>
                                </span>
                                <span
                                  unselectable="on"
                                  role="button"
                                  aria-label="Decrease Value"
                                  aria-disabled="true"
                                  className="ant-input-number-handler ant-input-number-handler-down ant-input-number-handler-down-disabled"
                                >
                                  <span
                                    role="img"
                                    aria-label="down"
                                    className="anticon anticon-down ant-input-number-handler-down-inner"
                                  >
                                    <svg
                                      viewBox="64 64 896 896"
                                      focusable="false"
                                      data-icon="down"
                                      width="1em"
                                      height="1em"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                    </svg>
                                  </span>
                                </span>
                              </div>
                              <div className="ant-input-number-input-wrap">
                                <input
                                  autoComplete="off"
                                  role="spinbutton"
                                  aria-valuemin={0}
                                  aria-valuenow={0}
                                  step="1"
                                  id="numAnimals"
                                  aria-describedby="numAnimals-errors"
                                  className="ant-input-number-input"
                                  disabled={undefined}
                                  value="0"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="web-src-pods-tripTemplate-custom-groups-PassengersLoad-PassengersLoadGroup-module__loadList"
                            data-id="load-list"
                          >
                            <div className="form-group field field-array">
                              <div className="ant-form-item">
                                <div className="ant-row ant-form-item-row">
                                  <div className="ant-col ant-form-item-control">
                                    <div className="ant-form-item-control-input">
                                      <div className="ant-form-item-control-input-content">
                                        <div>
                                          <div
                                            className="ant-col editable-table"
                                            style={{
                                              paddingRight: "0px",
                                              paddingLeft: "0px",
                                            }}
                                          >
                                            <div className="ant-table-wrapper">
                                              <div className="ant-spin-nested-loading">
                                                <div className="ant-spin-container">
                                                  <div className="ant-table">
                                                    <div className="ant-table-container">
                                                      <div className="ant-table-content">
                                                        <table
                                                          style={{
                                                            tableLayout:
                                                                          "auto",
                                                          }}
                                                        >
                                                          <colgroup></colgroup>
                                                          <thead className="ant-table-thead"></thead>
                                                          <tbody className="ant-table-tbody">
                                                            <tr
                                                              data-row-key="072176fd-9e89-4c26-9d81-b89662bd059a"
                                                              className="ant-table-row ant-table-row-level-0"
                                                            >
                                                              <td
                                                                className="ant-table-cell"
                                                                style={{
                                                                  width:
                                                                                "100%",
                                                                }}
                                                              >
                                                                PRIMARY
                                                              </td>
                                                              <td className="ant-table-cell">
                                                                <div
                                                                  className="ant-select ant-select-in-form-item ant-select-single ant-select-show-arrow ant-select-disabled"
                                                                  style={{
                                                                    minWidth:
                                                                                  "120px",
                                                                  }}
                                                                >
                                                                  <div className="ant-select-selector">
                                                                    <span className="ant-select-selection-search">
                                                                      <input
                                                                        type="search"
                                                                        disabled={
                                                                          undefined
                                                                        }
                                                                        autoComplete="off"
                                                                        className="ant-select-selection-search-input"
                                                                        role="combobox"
                                                                        aria-expanded="false"
                                                                        aria-haspopup="listbox"
                                                                        aria-owns="rc_select_43_list"
                                                                        aria-autocomplete="list"
                                                                        aria-controls="rc_select_43_list"
                                                                        aria-activedescendant="rc_select_43_list_0"
                                                                        readOnly={
                                                                          undefined
                                                                        }
                                                                        unselectable="on"
                                                                        value=""
                                                                        id="rc_select_43"
                                                                        style={{
                                                                          opacity: 0,
                                                                        }}
                                                                      />
                                                                    </span>
                                                                    <span
                                                                      className="ant-select-selection-item"
                                                                      title="AMB"
                                                                    >
                                                                      AMB
                                                                    </span>
                                                                  </div>
                                                                  <span
                                                                    className="ant-select-arrow"
                                                                    unselectable="on"
                                                                    aria-hidden="true"
                                                                    style={{
                                                                      userSelect:
                                                                                    "none",
                                                                    }}
                                                                  >
                                                                    <span
                                                                      role="img"
                                                                      aria-label="down"
                                                                      className="anticon anticon-down ant-select-suffix"
                                                                    >
                                                                      <svg
                                                                        viewBox="64 64 896 896"
                                                                        focusable="false"
                                                                        data-icon="down"
                                                                        width="1em"
                                                                        height="1em"
                                                                        fill="currentColor"
                                                                        aria-hidden="true"
                                                                      >
                                                                        <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                                                      </svg>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="web-src-uikit2-Field-Field-module__root web-src-pods-tripTemplate-custom-groups-PassengersLoad-PassengersLoadGroup-module__equipment">
                            <label
                              className="web-src-uikit2-Field-Field-module__label"
                              htmlFor="loadEquipment"
                            >
                              Equipment
                            </label>
                            <div className="form-group field field-array">
                              <div id="root_$loadEquipment">
                                <label> </label>
                                <div
                                  className="ant-list ant-list-split ant-list-bordered"
                                  tabIndex={-1}
                                  role="group"
                                  style={{ outlineWidth: "0px" }}
                                >
                                  <div className="ant-spin-nested-loading">
                                    <div className="ant-spin-container">
                                      <ul className="ant-list-items">
                                        <li className="ant-list-item">
                                          <div className="flex-row">
                                            <div
                                              style={{
                                                marginRight: "8px",
                                              }}
                                            >
                                              <label className="ant-checkbox-wrapper ant-checkbox-wrapper-disabled">
                                                <span className="ant-checkbox ant-checkbox-disabled">
                                                  <input
                                                    tabIndex={-1}
                                                    className="ant-checkbox-input"
                                                    disabled={
                                                      undefined
                                                    }
                                                    type="checkbox"
                                                  />
                                                  <span className="ant-checkbox-inner"></span>
                                                </span>
                                              </label>
                                            </div>
                                            <div>CANE</div>
                                          </div>
                                        </li>
                                        <li className="ant-list-item">
                                          <div className="flex-row">
                                            <div
                                              style={{
                                                marginRight: "8px",
                                              }}
                                            >
                                              <label className="ant-checkbox-wrapper ant-checkbox-wrapper-disabled">
                                                <span className="ant-checkbox ant-checkbox-disabled">
                                                  <input
                                                    tabIndex={-1}
                                                    className="ant-checkbox-input"
                                                    disabled={
                                                      undefined
                                                    }
                                                    type="checkbox"
                                                  />
                                                  <span className="ant-checkbox-inner"></span>
                                                </span>
                                              </label>
                                            </div>
                                            <div>CRUTCHES</div>
                                          </div>
                                        </li>
                                        <li className="ant-list-item">
                                          <div className="flex-row">
                                            <div
                                              style={{
                                                marginRight: "8px",
                                              }}
                                            >
                                              <label className="ant-checkbox-wrapper ant-checkbox-wrapper-disabled">
                                                <span className="ant-checkbox ant-checkbox-disabled">
                                                  <input
                                                    tabIndex={-1}
                                                    className="ant-checkbox-input"
                                                    disabled={
                                                      undefined
                                                    }
                                                    type="checkbox"
                                                  />
                                                  <span className="ant-checkbox-inner"></span>
                                                </span>
                                              </label>
                                            </div>
                                            <div>OXYGEN TANK</div>
                                          </div>
                                        </li>
                                        <li className="ant-list-item">
                                          <div className="flex-row">
                                            <div
                                              style={{
                                                marginRight: "8px",
                                              }}
                                            >
                                              <label className="ant-checkbox-wrapper ant-checkbox-wrapper-disabled">
                                                <span className="ant-checkbox ant-checkbox-disabled">
                                                  <input
                                                    tabIndex={-1}
                                                    className="ant-checkbox-input"
                                                    disabled={
                                                      undefined
                                                    }
                                                    type="checkbox"
                                                  />
                                                  <span className="ant-checkbox-inner"></span>
                                                </span>
                                              </label>
                                            </div>
                                            <div>WALKER</div>
                                          </div>
                                        </li>
                                        <li className="ant-list-item">
                                          <div className="flex-row">
                                            <div
                                              style={{
                                                marginRight: "8px",
                                              }}
                                            >
                                              <label className="ant-checkbox-wrapper ant-checkbox-wrapper-disabled">
                                                <span className="ant-checkbox ant-checkbox-disabled">
                                                  <input
                                                    tabIndex={-1}
                                                    className="ant-checkbox-input"
                                                    disabled={
                                                      undefined
                                                    }
                                                    type="checkbox"
                                                  />
                                                  <span className="ant-checkbox-inner"></span>
                                                </span>
                                              </label>
                                            </div>
                                            <div>WHITE CANE</div>
                                          </div>
                                        </li>
                                        <li className="ant-list-item">
                                          <div className="flex-row">
                                            <div
                                              style={{
                                                marginRight: "8px",
                                              }}
                                            >
                                              <label className="ant-checkbox-wrapper ant-checkbox-wrapper-disabled">
                                                <span className="ant-checkbox ant-checkbox-disabled">
                                                  <input
                                                    tabIndex={-1}
                                                    className="ant-checkbox-input"
                                                    disabled={
                                                      undefined
                                                    }
                                                    type="checkbox"
                                                  />
                                                  <span className="ant-checkbox-inner"></span>
                                                </span>
                                              </label>
                                            </div>
                                            <div>NF WALKER</div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="web-src-pods-tripTemplate-custom-groups-PassengersLoad-PassengersLoadGroup-module__excludedVehicleCategories">
                            <div className="ant-form-item">
                              <div className="form-group field field-array">
                                <div id="root_$excludedVehicleCategories">
                                  <label>
                                    Excluded Vehicle Cat.
                                  </label>
                                  <div
                                    className="ant-list ant-list-bordered"
                                    tabIndex={-1}
                                    role="group"
                                    style={{ outlineWidth: "0px" }}
                                  >
                                    <div className="ant-spin-nested-loading">
                                      <div className="ant-spin-container">
                                        <ul className="ant-list-items">
                                          <li
                                            className="ant-list-item"
                                            style={{
                                              display:
                                                            "inline-block",
                                            }}
                                          >
                                            <div className="flex-row">
                                              <div
                                                style={{
                                                  marginRight:
                                                                "8px",
                                                }}
                                              >
                                                <label className="ant-checkbox-wrapper ant-checkbox-wrapper-disabled">
                                                  <span className="ant-checkbox ant-checkbox-disabled">
                                                    <input
                                                      tabIndex={-1}
                                                      className="ant-checkbox-input"
                                                      disabled={
                                                        undefined
                                                      }
                                                      type="checkbox"
                                                    />
                                                    <span className="ant-checkbox-inner"></span>
                                                  </span>
                                                </label>
                                              </div>
                                              <div>SEDAN</div>
                                            </div>
                                          </li>
                                          <li
                                            className="ant-list-item"
                                            style={{
                                              display:
                                                            "inline-block",
                                            }}
                                          >
                                            <div className="flex-row">
                                              <div
                                                style={{
                                                  marginRight:
                                                                "8px",
                                                }}
                                              >
                                                <label className="ant-checkbox-wrapper ant-checkbox-wrapper-disabled">
                                                  <span className="ant-checkbox ant-checkbox-disabled">
                                                    <input
                                                      tabIndex={-1}
                                                      className="ant-checkbox-input"
                                                      disabled={
                                                        undefined
                                                      }
                                                      type="checkbox"
                                                    />
                                                    <span className="ant-checkbox-inner"></span>
                                                  </span>
                                                </label>
                                              </div>
                                              <div>VAN</div>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="web-src-uikit2-Field-Field-module__root">
                              <label
                                className="web-src-uikit2-Field-Field-module__label web-src-uikit2-Field-Field-module__labelRequired"
                                htmlFor="serviceMode"
                              >
                                Service Mode
                                <span
                                  className="web-src-uikit2-Field-Field-module__required"
                                  aria-hidden="true"
                                >
                                  *
                                </span>
                              </label>
                              <div className="form-group field field-number">
                                <div
                                  className="ant-form-item"
                                  style={{
                                    flex: "1 1 0%",
                                    width: "100%",
                                  }}
                                >
                                  <div className="ant-row ant-form-item-row">
                                    <div className="ant-col ant-form-item-control">
                                      <div className="ant-form-item-control-input">
                                        <div className="ant-form-item-control-input-content">
                                          <div
                                            className="ant-select ant-select-in-form-item ant-select-single ant-select-show-arrow ant-select-disabled"
                                            // required={undefined}
                                            // name="root_serviceMode"
                                            aria-describedby="root_serviceMode__error root_serviceMode__description root_serviceMode__help"
                                            style={{
                                              minWidth: "100px",
                                            }}
                                          >
                                            <div className="ant-select-selector">
                                              <span className="ant-select-selection-search">
                                                <input
                                                  type="search"
                                                  id="root_serviceMode"
                                                  disabled={
                                                    undefined
                                                  }
                                                  autoComplete="off"
                                                  className="ant-select-selection-search-input"
                                                  role="combobox"
                                                  aria-expanded="false"
                                                  aria-haspopup="listbox"
                                                  aria-owns="root_serviceMode_list"
                                                  aria-autocomplete="list"
                                                  aria-controls="root_serviceMode_list"
                                                  aria-activedescendant="root_serviceMode_list_0"
                                                  aria-describedby="root_serviceMode__error root_serviceMode__description root_serviceMode__help"
                                                  readOnly={
                                                    undefined
                                                  }
                                                  // unselectable="on"
                                                  value=""
                                                  style={{
                                                    opacity: 0,
                                                  }}
                                                />
                                              </span>
                                              <span
                                                className="ant-select-selection-item"
                                                title="CURB"
                                              >
                                                CURB
                                              </span>
                                            </div>
                                            <span
                                              className="ant-select-arrow"
                                              unselectable="on"
                                              aria-hidden="true"
                                              style={{
                                                userSelect: "none",
                                              }}
                                            >
                                              <span
                                                role="img"
                                                aria-label="down"
                                                className="anticon anticon-down ant-select-suffix"
                                              >
                                                <svg
                                                  viewBox="64 64 896 896"
                                                  focusable="false"
                                                  data-icon="down"
                                                  width="1em"
                                                  height="1em"
                                                  fill="currentColor"
                                                  aria-hidden="true"
                                                >
                                                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                                </svg>
                                              </span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="web-src-uikit2-Field-Field-module__root web-src-pods-tripTemplate-custom-groups-PassengersLoad-PassengersLoadGroup-module__loadInstructions">
                            <label
                              className="web-src-uikit2-Field-Field-module__label"
                              htmlFor="notesLoadDescription"
                            >
                              Load Instructions
                            </label>
                            <span
                              className="ant-input-affix-wrapper ant-input-affix-wrapper-textarea-with-clear-btn"
                              style={{ width: "100%" }}
                            >
                              <textarea
                                id="notesLoadDescription"
                                aria-describedby="notesLoadDescription-errors"
                                className="ant-input ant-input-disabled"
                                disabled={undefined}
                                style={{
                                  height: "30px",
                                  resize: "none",
                                  minHeight: "30px",
                                }}
                              ></textarea>
                              <span
                                role="button"
                                aria-label="close-circle"
                                tabIndex={-1}
                                className="anticon anticon-close-circle ant-input-clear-icon-hidden ant-input-clear-icon"
                              >
                                <svg
                                  fill-rule="evenodd"
                                  viewBox="64 64 896 896"
                                  focusable="false"
                                  data-icon="close-circle"
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                                </svg>
                              </span>
                            </span>
                          </div>
                        </div>
                      </fieldset>

                      <Group
                        className={s.reservationRight}
                        gridArea="right"
                      >
                        <fieldset
                          className="web-src-uikit2-Fieldset-Fieldset-module__root"
                          disabled={undefined}
                          style={{ gridArea: "scheduling" }}
                        >
                          <legend className="web-src-uikit2-Fieldset-Fieldset-module__legend">
                            Time Scheduling
                          </legend>
                          <header className="web-src-uikit2-Fieldset-Fieldset-module__header">
                            Time Scheduling
                          </header>
                          <div className="web-src-uikit2-Fieldset-Fieldset-module__body web-src-pods-tripSto-custom-groups-Scheduling-SchedulingGroup-module__root">
                            <div className="web-src-uikit2-Field-Field-module__root">
                              <label
                                className="web-src-uikit2-Field-Field-module__label web-src-uikit2-Field-Field-module__labelRequired"
                                htmlFor="requestedTime"
                              >
                                Request Pick Up
                                <span
                                  className="web-src-uikit2-Field-Field-module__required"
                                  aria-hidden="true"
                                >
                                  *
                                </span>
                              </label>
                              <input
                                autoComplete="off"
                                id="requestedTime"
                                required={undefined}
                                aria-describedby="requestedTime-errors"
                                disabled={undefined}
                                className="ant-input ant-input-disabled"
                                type="text"
                                value=""
                              />
                            </div>
                            <div className="web-src-uikit2-Field-Field-module__root">
                              <label
                                className="web-src-uikit2-Field-Field-module__label web-src-uikit2-Field-Field-module__labelRequired"
                                htmlFor="scheduledTime"
                              >
                                Schedule
                                <span
                                  className="web-src-uikit2-Field-Field-module__required"
                                  aria-hidden="true"
                                >
                                  *
                                </span>
                              </label>
                              <input
                                autoComplete="off"
                                id="scheduledTime"
                                required={undefined}
                                aria-describedby="scheduledTime-errors"
                                disabled={undefined}
                                className="ant-input ant-input-disabled"
                                type="text"
                                value=""
                              />
                            </div>
                            <div className="web-src-uikit2-Field-Field-module__root">
                              <label
                                className="web-src-uikit2-Field-Field-module__label"
                                htmlFor="dueTime"
                              >
                                Due
                              </label>
                              <input
                                id="dueTime"
                                aria-describedby="dueTime-errors"
                                disabled={undefined}
                                className="ant-input ant-input-disabled"
                                type="text"
                                value=""
                              />
                            </div>
                            <div className="web-src-uikit2-Field-Field-module__root">
                              <label
                                className="web-src-uikit2-Field-Field-module__label"
                                htmlFor="dropoffBy"
                              >
                                Drop Off By
                              </label>
                              <input
                                autoComplete="off"
                                id="dropoffBy"
                                aria-describedby="dropoffBy-errors"
                                disabled={undefined}
                                className="ant-input ant-input-disabled"
                                type="text"
                                value=""
                              />
                            </div>
                          </div>
                        </fieldset>
                        <fieldset
                          className="web-src-uikit2-Fieldset-Fieldset-module__root"
                          disabled={undefined}
                          style={{ gridArea: "fare" }}
                        >
                          <legend className="web-src-uikit2-Fieldset-Fieldset-module__legend">
                            Fare
                          </legend>
                          <header className="web-src-uikit2-Fieldset-Fieldset-module__header">
                            Fare
                          </header>
                          <div className="web-src-uikit2-Fieldset-Fieldset-module__body web-src-pods-tripTemplate-custom-groups-Fare-FareGroup-module__root">
                            <div className="form-group field field-object">
                              <label htmlFor="FareType-$fareType">
                                Type*
                              </label>
                              <div
                                className="ant-form-item"
                                style={{
                                  flex: "1 1 0%",
                                  width: "100%",
                                }}
                              >
                                <div className="ant-row ant-form-item-row">
                                  <div className="ant-col ant-form-item-control">
                                    <div className="ant-form-item-control-input">
                                      <div className="ant-form-item-control-input-content">
                                        <div className="ant-select ant-select-in-form-item ant-select-single ant-select-show-arrow ant-select-disabled">
                                          <div className="ant-select-selector">
                                            <span className="ant-select-selection-search">
                                              <input
                                                type="search"
                                                id="FareType-$fareType"
                                                disabled={undefined}
                                                autoComplete="off"
                                                className="ant-select-selection-search-input"
                                                role="combobox"
                                                aria-expanded="false"
                                                aria-haspopup="listbox"
                                                aria-owns="FareType-$fareType_list"
                                                aria-autocomplete="list"
                                                aria-controls="FareType-$fareType_list"
                                                aria-activedescendant="FareType-$fareType_list_0"
                                                readOnly={undefined}
                                                unselectable="on"
                                                value=""
                                                style={{
                                                  opacity: 0,
                                                }}
                                              />
                                            </span>
                                            <span className="ant-select-selection-placeholder">
                                              - SELECT -
                                            </span>
                                          </div>
                                          <span
                                            className="ant-select-arrow"
                                            unselectable="on"
                                            aria-hidden="true"
                                            style={{
                                              userSelect: "none",
                                            }}
                                          >
                                            <span
                                              role="img"
                                              aria-label="down"
                                              className="anticon anticon-down ant-select-suffix"
                                            >
                                              <svg
                                                viewBox="64 64 896 896"
                                                focusable="false"
                                                data-icon="down"
                                                width="1em"
                                                height="1em"
                                                fill="currentColor"
                                                aria-hidden="true"
                                              >
                                                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                              </svg>
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group field field-number">
                              <label
                                className="control-label"
                                htmlFor="root_$fareMiles"
                              >
                                Miles
                              </label>
                              <div className="ant-form-item">
                                <div className="ant-row ant-form-item-row">
                                  <div className="ant-col ant-form-item-control">
                                    <div className="ant-form-item-control-input">
                                      <div className="ant-form-item-control-input-content">
                                        <div
                                          className="ant-input-number ant-input-number-in-form-item ant-input-number-disabled"
                                          style={{
                                            width: "100%",
                                          }}
                                        >
                                          <div className="ant-input-number-handler-wrap">
                                            <span
                                              unselectable="on"
                                              role="button"
                                              aria-label="Increase Value"
                                              aria-disabled="false"
                                              className="ant-input-number-handler ant-input-number-handler-up"
                                            >
                                              <span
                                                role="img"
                                                aria-label="up"
                                                className="anticon anticon-up ant-input-number-handler-up-inner"
                                              >
                                                <svg
                                                  viewBox="64 64 896 896"
                                                  focusable="false"
                                                  data-icon="up"
                                                  width="1em"
                                                  height="1em"
                                                  fill="currentColor"
                                                  aria-hidden="true"
                                                >
                                                  <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
                                                </svg>
                                              </span>
                                            </span>
                                            <span
                                              unselectable="on"
                                              role="button"
                                              aria-label="Decrease Value"
                                              aria-disabled="false"
                                              className="ant-input-number-handler ant-input-number-handler-down"
                                            >
                                              <span
                                                role="img"
                                                aria-label="down"
                                                className="anticon anticon-down ant-input-number-handler-down-inner"
                                              >
                                                <svg
                                                  viewBox="64 64 896 896"
                                                  focusable="false"
                                                  data-icon="down"
                                                  width="1em"
                                                  height="1em"
                                                  fill="currentColor"
                                                  aria-hidden="true"
                                                >
                                                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                                </svg>
                                              </span>
                                            </span>
                                          </div>
                                          <div className="ant-input-number-input-wrap">
                                            <input
                                              autoComplete="off"
                                              role="spinbutton"
                                              step="1"
                                              id="root_$fareMiles"
                                              name="root_$fareMiles"
                                              placeholder=""
                                              type="number"
                                              aria-describedby="root_$fareMiles__error root_$fareMiles__description root_$fareMiles__help"
                                              className="ant-input-number-input"
                                              disabled={undefined}
                                              value=""
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                        <fieldset
                          className="web-src-uikit2-Fieldset-Fieldset-module__root"
                          disabled={undefined}
                          style={{ gridArea: "callout" }}
                        >
                          <legend className="web-src-uikit2-Fieldset-Fieldset-module__legend">
                            Call-out
                          </legend>
                          <header className="web-src-uikit2-Fieldset-Fieldset-module__header">
                            Call-out
                          </header>
                          <div className="web-src-uikit2-Fieldset-Fieldset-module__body web-src-pods-tripTemplate-custom-groups-Callout-CalloutGroup-module__root">
                            <div className="web-src-uikit2-Table-Table-module__tableWrapper web-src-uikit2-Table-Table-module__nav">
                              <table
                                className="web-src-uikit2-Table-Table-module__table"
                                id="table-687"
                                role="grid"
                                aria-rowcount={2}
                                aria-colcount={3}
                                tabIndex={-1}
                              >
                                <thead className="web-src-uikit2-Table-Table-module__thead">
                                  <tr>
                                    <th
                                      className="web-src-uikit2-Table-Table-module__th web-src-uikit2-Table-Table-module__leftAlign web-src-uikit2-Table-Table-module__unsortable web-src-uikit2-Table-Table-module__noWrap web-src-uikit2-Table-Table-module__cellFirst"
                                      tabIndex={-1}
                                      aria-sort="none"
                                      data-index="check"
                                    ></th>
                                    <th
                                      className="web-src-uikit2-Table-Table-module__th web-src-uikit2-Table-Table-module__leftAlign web-src-uikit2-Table-Table-module__unsortable web-src-uikit2-Table-Table-module__noWrap"
                                      tabIndex={-1}
                                      scope="col"
                                      aria-sort="none"
                                      data-index="type"
                                    >
                                      Type
                                    </th>
                                    <th
                                      className="web-src-uikit2-Table-Table-module__th web-src-uikit2-Table-Table-module__leftAlign web-src-uikit2-Table-Table-module__unsortable web-src-uikit2-Table-Table-module__noWrap"
                                      tabIndex={-1}
                                      scope="col"
                                      aria-sort="none"
                                      data-index="phone"
                                    >
                                      Phone
                                    </th>
                                  </tr>
                                </thead>
                                <tbody
                                  className="web-src-uikit2-Table-Table-module__tbody"
                                  tabIndex={-1}
                                >
                                  <tr
                                    className="web-src-uikit2-Table-Table-module__tr"
                                    data-page="1"
                                    aria-rowindex={1}
                                  >
                                    <td
                                      className="web-src-uikit2-Table-Table-module__td web-src-uikit2-Table-Table-module__leftAlign web-src-uikit2-Table-Table-module__noWrap"
                                      data-align="leftAlign"
                                      tabIndex={-1}
                                      aria-colindex={1}
                                    >
                                      <span className="web-src-uikit2-Checkbox-Checkbox-module__root web-src-uikit2-Checkbox-Checkbox-module__disabled">
                                        <input
                                          className="web-src-uikit2-Checkbox-Checkbox-module__input"
                                          disabled={undefined}
                                          type="checkbox"
                                          value=""
                                        />
                                        <span className="web-src-uikit2-Checkbox-Checkbox-module__inner"></span>
                                      </span>
                                    </td>
                                    <td
                                      className="web-src-uikit2-Table-Table-module__td web-src-uikit2-Table-Table-module__leftAlign web-src-uikit2-Table-Table-module__noWrap"
                                      data-align="leftAlign"
                                      tabIndex={-1}
                                      aria-colindex={2}
                                    >
                                      <div className="web-src-uikit2-Select-Select-module__combo web-src-uikit2-Select-Select-module__disabled">
                                        <input
                                          aria-controls="callOutPropertiesFirst.calloutMedium-listbox"
                                          aria-expanded="false"
                                          aria-haspopup="listbox"
                                          aria-labelledby="callOutPropertiesFirst.calloutMedium-label"
                                          id="callOutPropertiesFirst.calloutMedium"
                                          className="web-src-uikit2-Select-Select-module__comboInput"
                                          role="combobox"
                                          tabIndex={-1}
                                          disabled={undefined}
                                          value="NONE"
                                        />
                                      </div>
                                    </td>
                                    <td
                                      className="web-src-uikit2-Table-Table-module__td web-src-uikit2-Table-Table-module__leftAlign web-src-uikit2-Table-Table-module__noWrap"
                                      data-align="leftAlign"
                                      tabIndex={-1}
                                      aria-colindex={3}
                                    >
                                      <input
                                        placeholder="(___) ___-____"
                                        id="callOutPropertiesFirst.phone"
                                        disabled={undefined}
                                        className="ant-input ant-input-disabled"
                                        type="text"
                                        value=""
                                      />
                                    </td>
                                  </tr>
                                  <tr
                                    className="web-src-uikit2-Table-Table-module__tr"
                                    data-page="2"
                                    aria-rowindex={2}
                                  >
                                    <td
                                      className="web-src-uikit2-Table-Table-module__td web-src-uikit2-Table-Table-module__leftAlign web-src-uikit2-Table-Table-module__noWrap"
                                      data-align="leftAlign"
                                      tabIndex={-1}
                                      aria-colindex={1}
                                    >
                                      <span className="web-src-uikit2-Checkbox-Checkbox-module__root web-src-uikit2-Checkbox-Checkbox-module__disabled">
                                        <input
                                          className="web-src-uikit2-Checkbox-Checkbox-module__input"
                                          disabled={undefined}
                                          type="checkbox"
                                          value=""
                                        />
                                        <span className="web-src-uikit2-Checkbox-Checkbox-module__inner"></span>
                                      </span>
                                    </td>
                                    <td
                                      className="web-src-uikit2-Table-Table-module__td web-src-uikit2-Table-Table-module__leftAlign web-src-uikit2-Table-Table-module__noWrap"
                                      data-align="leftAlign"
                                      tabIndex={-1}
                                      aria-colindex={2}
                                    >
                                      <div className="web-src-uikit2-Select-Select-module__combo web-src-uikit2-Select-Select-module__disabled">
                                        <input
                                          aria-controls="callOutPropertiesSecond.calloutMedium-listbox"
                                          aria-expanded="false"
                                          aria-haspopup="listbox"
                                          aria-labelledby="callOutPropertiesSecond.calloutMedium-label"
                                          id="callOutPropertiesSecond.calloutMedium"
                                          className="web-src-uikit2-Select-Select-module__comboInput"
                                          role="combobox"
                                          tabIndex={-1}
                                          disabled={undefined}
                                          value="NONE"
                                        />
                                      </div>
                                    </td>
                                    <td
                                      className="web-src-uikit2-Table-Table-module__td web-src-uikit2-Table-Table-module__leftAlign web-src-uikit2-Table-Table-module__noWrap"
                                      data-align="leftAlign"
                                      tabIndex={-1}
                                      aria-colindex={3}
                                    >
                                      <input
                                        placeholder="(___) ___-____"
                                        id="callOutPropertiesSecond.phone"
                                        disabled={undefined}
                                        className="ant-input ant-input-disabled"
                                        type="text"
                                        value=""
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </fieldset>
                        <fieldset
                          className="web-src-uikit2-Fieldset-Fieldset-module__root"
                          disabled={undefined}
                          style={{ gridArea: "dispatch" }}
                        >
                          <legend className="web-src-uikit2-Fieldset-Fieldset-module__legend">
                            Dispatch by
                          </legend>
                          <header className="web-src-uikit2-Fieldset-Fieldset-module__header">
                            <div style={{ display: "flex" }}>
                              <span>Dispatch By</span>
                            </div>
                          </header>
                          <div className="web-src-uikit2-Fieldset-Fieldset-module__body">
                            <div className="form-group field field-object">
                              <label htmlFor="DdsFleet-ddsFleet">
                                Dispatch By - Provider*
                              </label>
                              <div
                                className="ant-form-item"
                                style={{
                                  flex: "1 1 0%",
                                  width: "100%",
                                }}
                              >
                                <div className="ant-row ant-form-item-row">
                                  <div className="ant-col ant-form-item-control">
                                    <div className="ant-form-item-control-input">
                                      <div className="ant-form-item-control-input-content">
                                        <div className="ant-select ant-select-in-form-item ant-select-single ant-select-show-arrow ant-select-disabled">
                                          <div className="ant-select-selector">
                                            <span className="ant-select-selection-search">
                                              <input
                                                type="search"
                                                id="DdsFleet-ddsFleet"
                                                disabled={undefined}
                                                autoComplete="off"
                                                className="ant-select-selection-search-input"
                                                role="combobox"
                                                aria-expanded="false"
                                                aria-haspopup="listbox"
                                                aria-owns="DdsFleet-ddsFleet_list"
                                                aria-autocomplete="list"
                                                aria-controls="DdsFleet-ddsFleet_list"
                                                aria-activedescendant="DdsFleet-ddsFleet_list_0"
                                                readOnly={undefined}
                                                unselectable="on"
                                                value=""
                                                style={{
                                                  opacity: 0,
                                                }}
                                              />
                                            </span>
                                            <span className="ant-select-selection-placeholder">
                                              - SELECT -
                                            </span>
                                          </div>
                                          <span
                                            className="ant-select-arrow"
                                            unselectable="on"
                                            aria-hidden="true"
                                            style={{
                                              userSelect: "none",
                                            }}
                                          >
                                            <span
                                              role="img"
                                              aria-label="down"
                                              className="anticon anticon-down ant-select-suffix"
                                            >
                                              <svg
                                                viewBox="64 64 896 896"
                                                focusable="false"
                                                data-icon="down"
                                                width="1em"
                                                height="1em"
                                                fill="currentColor"
                                                aria-hidden="true"
                                              >
                                                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                              </svg>
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group field field-boolean">
                              <div className="ant-form-item">
                                <div className="ant-row ant-form-item-row">
                                  <div className="ant-col ant-form-item-control">
                                    <div className="ant-form-item-control-input">
                                      <div className="ant-form-item-control-input-content">
                                        <label className="ant-checkbox-wrapper ant-checkbox-wrapper-disabled ant-checkbox-wrapper-in-form-item">
                                          <span className="ant-checkbox ant-checkbox-disabled">
                                            <input
                                              id="root_overrideAllocation"
                                              name="root_overrideAllocation"
                                              aria-describedby="root_overrideAllocation__error root_overrideAllocation__description root_overrideAllocation__help"
                                              className="ant-checkbox-input"
                                              disabled={undefined}
                                              type="checkbox"
                                            />
                                            <span className="ant-checkbox-inner"></span>
                                          </span>
                                          <span>
                                            Override Allocation
                                          </span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                        <fieldset
                          className="web-src-uikit2-Fieldset-Fieldset-module__root"
                          disabled={undefined}
                          style={{ gridArea: "audit" }}
                        >
                          <legend className="web-src-uikit2-Fieldset-Fieldset-module__legend">
                            Audit Trail
                          </legend>
                          <div className="web-src-uikit2-Fieldset-Fieldset-module__body"></div>
                        </fieldset>
                      </Group>

                      <fieldset
                        className="web-src-uikit2-Fieldset-Fieldset-module__root"
                        style={{ gridArea: "generalNotes" }}
                      >
                        <legend className="web-src-uikit2-Fieldset-Fieldset-module__legend">
                          General
                        </legend>
                        <div className="web-src-uikit2-Fieldset-Fieldset-module__body web-src-pods-tripTemplate-custom-groups-GeneralNotes-GeneralNotes-module__root">
                          <div className="web-src-uikit2-Field-Field-module__root">
                            <label
                              className="web-src-uikit2-Field-Field-module__label"
                              htmlFor="generalNotes"
                            >
                              General Notes
                            </label>
                            <textarea
                              spellCheck="false"
                              id="generalNotes"
                              aria-describedby="generalNotes-errors"
                              className="ant-input ant-input-disabled"
                              disabled={undefined}
                            ></textarea>
                          </div>
                        </div>
                      </fieldset>
                    </>
                  ),
                },
                {
                  label: "Subscription Hold",
                  key: "subscriptionHold",
                  children: (
                    <div
                      className={cn(s.subscriptionTab, {
                        [s.createMode]: true,
                      })}
                    >
                      <div className="form-group field field-array">
                        Save Trip STO First
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <div className="buttons-container-modal">
          <div className="web-src-framework-components-InteractionsButtonPanel-module__actionPanel">
            <div>
              <button
                data-type="interaction"
                type="submit"
                className="ant-btn ant-btn-primary web-src-framework-components-InteractionButton-module__interaction"
              >
                <span>Save [F1]</span>
              </button>
            </div>
            <div>
              <button
                type="button"
                className="ant-btn ant-btn-default"
                disabled={undefined}
              >
                <span>Clear [F9]</span>
              </button>
            </div>
            <div>
              <button
                type="button"
                className="ant-btn ant-btn-default"
              >
                <span>Distribution by Time</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
