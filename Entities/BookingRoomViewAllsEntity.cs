using System;
using System.Collections.Generic;

namespace EntitiesExt
{
    [Serializable]
    public class BookingRoomViewAll
    {
            #region Attributes

            private Int64 _IDBookingRoom;
            private string _Customer_Name;
            private string _Rooms_Sku;
            private Int64 _Cost;
            private String _CostUnit;
            private String _Note;
            private DateTime _CheckInPlan;
            private DateTime _CheckOutPlan;
            private DateTime _CheckInActual;
            private DateTime _CheckOutActual;
            private Int32 _PayMethod;
            private Int32 _StatusPay;
            private Int32 _BookingStatus;
            private Int64 _BookingMoney;
            private DateTime _Date;
            private Int32 _EditCounter;
            private Int32 _Status;
            private Boolean _Disable;
            private String _Subject;
            private String _Location;
            private String _Description;
            private DateTime _StartTime;
            private DateTime _EndTime;
            private Byte _IsAllDayEvent;
            private Byte _Color;
            private Byte _IsRecurring;
            private Byte _IsEditable;
            private String _AdditionalColumn1;
            private string _Code;
            private Int32 _IDLang;

            #endregion Attributes

            #region Constructor

            public BookingRoomViewAll()
            {
                _IDBookingRoom = Int64.MinValue;
                _Customer_Name = string.Empty;
                _Rooms_Sku = string.Empty;
                _Cost = Int64.MinValue;
                _CostUnit = String.Empty;
                _Note = String.Empty;

                _PayMethod = Int32.MinValue;
                _StatusPay = Int32.MinValue;
                _BookingStatus = Int32.MinValue;
                _BookingMoney = Int64.MinValue;

                _CheckInPlan = DateTime.Parse("01/01/1900");
                _CheckOutPlan = DateTime.Parse("01/01/1900");
                _CheckInActual = DateTime.Parse("01/01/1900");
                _CheckOutActual = DateTime.Parse("01/01/1900");
                _Date = DateTime.Parse("01/01/1900");
                _StartTime = DateTime.Parse("01/01/1900");
                _EndTime = DateTime.Parse("01/01/1900");

                _EditCounter = Int32.MinValue;
                _Status = Int32.MinValue;
                _Disable = false;
                _Subject = String.Empty;
                _Location = String.Empty;
                _Description = String.Empty;

                _IsAllDayEvent = Byte.MinValue;
                _Color = Byte.MinValue;
                _IsRecurring = Byte.MinValue;
                _IsEditable = Byte.MinValue;
                _AdditionalColumn1 = String.Empty;
                _Code = string.Empty;
                _IDLang = Int32.MinValue;
            }


            #endregion Constructor

            #region Properties

            public Int64 IDBookingRoom
            {
                set { _IDBookingRoom = value; }
                get { return _IDBookingRoom; }
            }

            public string Customer_Name
            {
                set { _Customer_Name = value; }
                get { return _Customer_Name; }
            }

            public string Rooms_Sku
            {
                set { _Rooms_Sku = value; }
                get { return _Rooms_Sku; }
            }

            public Int64 Cost
            {
                set { _Cost = value; }
                get { return _Cost; }
            }

            public String CostUnit
            {
                set { _CostUnit = value; }
                get { return _CostUnit; }
            }

            public String Note
            {
                set { _Note = value; }
                get { return _Note; }
            }

            public DateTime CheckInPlan
            {
                set { _CheckInPlan = value; }
                get { return _CheckInPlan; }
            }

            public DateTime CheckOutPlan
            {
                set { _CheckOutPlan = value; }
                get { return _CheckOutPlan; }
            }

            public DateTime CheckInActual
            {
                set { _CheckInActual = value; }
                get { return _CheckInActual; }
            }

            public DateTime CheckOutActual
            {
                set { _CheckOutActual = value; }
                get { return _CheckOutActual; }
            }

            public Int32 PayMethod
            {
                set { _PayMethod = value; }
                get { return _PayMethod; }
            }

            public Int32 StatusPay
            {
                set { _StatusPay = value; }
                get { return _StatusPay; }
            }

            public Int32 BookingStatus
            {
                set { _BookingStatus = value; }
                get { return _BookingStatus; }
            }

            public Int64 BookingMoney
            {
                set { _BookingMoney = value; }
                get { return _BookingMoney; }
            }

            public DateTime Date
            {
                set { _Date = value; }
                get { return _Date; }
            }

            public Int32 EditCounter
            {
                set { _EditCounter = value; }
                get { return _EditCounter; }
            }

            public Int32 Status
            {
                set { _Status = value; }
                get { return _Status; }
            }

            public Boolean Disable
            {
                set { _Disable = value; }
                get { return _Disable; }
            }

            public String Subject
            {
                set { _Subject = value; }
                get { return _Subject; }
            }

            public String Location
            {
                set { _Location = value; }
                get { return _Location; }
            }

            public String Description
            {
                set { _Description = value; }
                get { return _Description; }
            }

            public DateTime StartTime
            {
                set { _StartTime = value; }
                get { return _StartTime; }
            }

            public DateTime EndTime
            {
                set { _EndTime = value; }
                get { return _EndTime; }
            }

            public Byte IsAllDayEvent
            {
                set { _IsAllDayEvent = value; }
                get { return _IsAllDayEvent; }
            }

            public Byte Color
            {
                set { _Color = value; }
                get { return _Color; }
            }

            public Byte IsRecurring
            {
                set { _IsRecurring = value; }
                get { return _IsRecurring; }
            }

            public Byte IsEditable
            {
                set { _IsEditable = value; }
                get { return _IsEditable; }
            }

            public String AdditionalColumn1
            {
                set { _AdditionalColumn1 = value; }
                get { return _AdditionalColumn1; }
            }

            public string Code
            {
                set { _Code = value; }
                get { return _Code; }
            }

            public Int32 IDLang
            {
                set { _IDLang = value; }
                get { return _IDLang; }
            }

            public Object this[String propertyName]
            {
                get { return ExtendedProperties.ContainsKey(propertyName) ? ExtendedProperties[propertyName] : null; }
                set
                {
                    if (ExtendedProperties.ContainsKey(propertyName))
                        ExtendedProperties[propertyName] = value;
                    else
                        ExtendedProperties.Add(propertyName, value);
                }
            }

            public Dictionary<String, Object> ExtendedProperties { get; private set; }

            #endregion Properties

            #region Override methods

            public override String ToString()
            {
                var str = String.Format("BookingRooms information:");
                str += Environment.NewLine + "ID: " + _IDBookingRoom;
                str += Environment.NewLine + "NameCustomer: " + _Customer_Name;
                str += Environment.NewLine + "NameRoom: " + _Rooms_Sku;
                str += Environment.NewLine + "Cost: " + _Cost;
                str += Environment.NewLine + "CostUnit: " + _CostUnit;
                str += Environment.NewLine + "Note: " + _Note;
                str += Environment.NewLine + "CheckInPlan: " + _CheckInPlan;
                str += Environment.NewLine + "CheckOutPlan: " + _CheckOutPlan;
                str += Environment.NewLine + "CheckInActual: " + _CheckInActual;
                str += Environment.NewLine + "CheckOutActual: " + _CheckOutActual;
                str += Environment.NewLine + "PayMethod: " + _PayMethod;
                str += Environment.NewLine + "StatusPay: " + _StatusPay;
                str += Environment.NewLine + "BookingStatus: " + _BookingStatus;
                str += Environment.NewLine + "BookingMoney: " + _BookingMoney;
                str += Environment.NewLine + "Date: " + _Date;
                str += Environment.NewLine + "EditCounter: " + _EditCounter;
                str += Environment.NewLine + "Status: " + _Status;
                str += Environment.NewLine + "Disable: " + _Disable;
                str += Environment.NewLine + "Subject: " + _Subject;
                str += Environment.NewLine + "Location: " + _Location;
                str += Environment.NewLine + "Description: " + _Description;
                str += Environment.NewLine + "StartTime: " + _StartTime;
                str += Environment.NewLine + "EndTime: " + _EndTime;
                str += Environment.NewLine + "IsAllDayEvent: " + _IsAllDayEvent;
                str += Environment.NewLine + "Color: " + _Color;
                str += Environment.NewLine + "IsRecurring: " + _IsRecurring;
                str += Environment.NewLine + "IsEditable: " + _IsEditable;
                str += Environment.NewLine + "AdditionalColumn1: " + _AdditionalColumn1;
                str += Environment.NewLine + "Code: " + _Code;
                str += Environment.NewLine + "IDLang: " + _IDLang;
                return str;
            }

            #endregion Override methods
        }
    }
