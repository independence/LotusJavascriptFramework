using System;
using System.Collections.Generic;
using Library;

namespace EntitiesExt
{
    [Serializable]
   public class BookingHallViewAll
    {
        #region Attributes

		private Int64 _BookingHalls_ID;
        private string _Customers_Name;
        private string _Name_Hall;
		private Int64 _CreatedByIDUser;
		private DateTime _CreatedDate;
		private Int64 _Cost;
		private String _CostUnit;
		private Int32 _PayMethod;
		private Int32 _StatusPay;
		private Int64 _BookingMoney;
		private Int32 _BookingStatus;
		private Int32 _Unit;
		private Int32 _TableOrPerson;
		private DateTime _Date;
		private DateTime _LunarDate;
		private String _Note;
		private Int32 _Status;
		private Int32 _Type;
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
		private String _Code;
		private Int32 _IDLang;

		#endregion Attributes

		#region Constructor

        public BookingHallViewAll()
		{
			_BookingHalls_ID = Int64.MinValue;
            _Customers_Name = string.Empty;
			_Name_Hall = string.Empty;
			_CreatedByIDUser = Int64.MinValue;
			_CreatedDate = DateTime.MinValue;
			_Cost = Int64.MinValue;
			_CostUnit = String.Empty;
			_PayMethod = Int32.MinValue;
			_StatusPay = Int32.MinValue;
			_BookingMoney = Int64.MinValue;
			_BookingStatus = Int32.MinValue;
			_Unit = Int32.MinValue;
			_TableOrPerson = Int32.MinValue;
			_Date = DateTime.MinValue;
			_LunarDate = DateTime.MinValue;
			_Note = String.Empty;
			_Status = Int32.MinValue;
			_Type = Int32.MinValue;
			_Disable = false;
			_Subject = String.Empty;
			_Location = String.Empty;
			_Description = String.Empty;
			_StartTime = DateTime.MinValue;
			_EndTime = DateTime.MinValue;
			_IsAllDayEvent = Byte.MinValue;
			_Color = Byte.MinValue;
			_IsRecurring = Byte.MinValue;
			_IsEditable = Byte.MinValue;
			_AdditionalColumn1 = String.Empty;
			_Code = String.Empty;
			_IDLang = Int32.MinValue;
		}
        

		#endregion Constructor

		#region Properties

        public Int64 BookingHalls_ID
		{
			set { _BookingHalls_ID = value; }
            get { return _BookingHalls_ID; }
		}

		public String Customers_Name
		{
			set { _Customers_Name = value; }
			get { return _Customers_Name; }
		}

        public string Name_Hall
		{
			set { _Name_Hall = value; }
			get { return _Name_Hall; }
		}

		public Int64 CreatedByIDUser
		{
			set { _CreatedByIDUser = value; }
			get { return _CreatedByIDUser; }
		}

		public DateTime CreatedDate
		{
			set { _CreatedDate = value; }
			get { return _CreatedDate; }
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

		public Int64 BookingMoney
		{
			set { _BookingMoney = value; }
			get { return _BookingMoney; }
		}

		public Int32 BookingStatus
		{
			set { _BookingStatus = value; }
			get { return _BookingStatus; }
		}

		public Int32 Unit
		{
			set { _Unit = value; }
			get { return _Unit; }
		}

		public Int32 TableOrPerson
		{
			set { _TableOrPerson = value; }
			get { return _TableOrPerson; }
		}

		public DateTime Date
		{
			set { _Date = value; }
			get { return _Date; }
		}

		public DateTime LunarDate
		{
			set { _LunarDate = value; }
			get { return _LunarDate; }
		}

		public String Note
		{
			set { _Note = value; }
			get { return _Note; }
		}

		public Int32 Status
		{
			set { _Status = value; }
			get { return _Status; }
		}

		public Int32 Type
		{
			set { _Type = value; }
			get { return _Type; }
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

		public String Code
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
			var str = String.Format("BookingHalls information:");
			str += Environment.NewLine + "ID: " + _BookingHalls_ID;
			str += Environment.NewLine + "NameCustomer: " + _Customers_Name;
			str += Environment.NewLine + "NameHall: " + _Name_Hall;
			str += Environment.NewLine + "CreatedByIDUser: " + _CreatedByIDUser;
			str += Environment.NewLine + "CreatedDate: " + _CreatedDate;
			str += Environment.NewLine + "Cost: " + _Cost;
			str += Environment.NewLine + "CostUnit: " + _CostUnit;
			str += Environment.NewLine + "PayMethod: " + _PayMethod;
			str += Environment.NewLine + "StatusPay: " + _StatusPay;
			str += Environment.NewLine + "BookingMoney: " + _BookingMoney;
			str += Environment.NewLine + "BookingStatus: " + _BookingStatus;
			str += Environment.NewLine + "Unit: " + _Unit;
			str += Environment.NewLine + "TableOrPerson: " + _TableOrPerson;
			str += Environment.NewLine + "Date: " + _Date;
			str += Environment.NewLine + "LunarDate: " + _LunarDate;
			str += Environment.NewLine + "Note: " + _Note;
			str += Environment.NewLine + "Status: " + _Status;
			str += Environment.NewLine + "Type: " + _Type;
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
