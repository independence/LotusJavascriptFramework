using System;
using System.Collections.Generic;

namespace EntitiesExt
{
    [Serializable]
    public class PermitViewAll
    {
        #region Attributes

        private Int64 _UserId;
        private String _Username;
        private Int32 _UserGroup;
        private Int32 _PermitID;
        private String _PermitName;
        private String _PageURL;
        private Boolean _IsInsert;
        private Boolean _IsView;
        private Boolean _IsUpdate;
        private Boolean _IsDelete;
        private Boolean _IsSpecial;
        private String _Description;
        private Int32 _PermitDetails_Status;
        private Int32 _PermitUserMappings_Status;
        private Int32 _Permits_Status;
        private Int32 _SystemUsers_Status;
        private String _Email;
        private Int32 _Type;

        #endregion Attributes

        #region Constructor

        public PermitViewAll()
        {
            _UserId = Int64.MinValue;
            _Username = String.Empty;
            _UserGroup = Int32.MinValue;
            _PermitID = Int32.MinValue;
            _PermitName = String.Empty;
            _PageURL = String.Empty;
            _IsInsert = false;
            _IsView = false;
            _IsUpdate = false;
            _IsDelete = false;
            _IsSpecial = false;
            _Description = String.Empty;
            _PermitDetails_Status = Int32.MinValue;
            _PermitUserMappings_Status = Int32.MinValue;
            _Permits_Status = Int32.MinValue;
            _SystemUsers_Status = Int32.MinValue;
            _Email = String.Empty;
            _Type = Int32.MinValue;
        }

        #endregion Constructor

        #region Properties

        public Int64 UserId
        {
            set { _UserId = value; }
            get { return _UserId; }
        }

        public String Username
        {
            set { _Username = value; }
            get { return _Username; }
        }

        public Int32 UserGroup
        {
            set { _UserGroup = value; }
            get { return _UserGroup; }
        }

        public Int32 PermitID
        {
            set { _PermitID = value; }
            get { return _PermitID; }
        }

        public String PermitName
        {
            set { _PermitName = value; }
            get { return _PermitName; }
        }

        public String PageURL
        {
            set { _PageURL = value; }
            get { return _PageURL; }
        }

        public Boolean IsInsert
        {
            set { _IsInsert = value; }
            get { return _IsInsert; }
        }

        public Boolean IsView
        {
            set { _IsView = value; }
            get { return _IsView; }
        }

        public Boolean IsUpdate
        {
            set { _IsUpdate = value; }
            get { return _IsUpdate; }
        }

        public Boolean IsDelete
        {
            set { _IsDelete = value; }
            get { return _IsDelete; }
        }

        public Boolean IsSpecial
        {
            set { _IsSpecial = value; }
            get { return _IsSpecial; }
        }

        public String Description
        {
            set { _Description = value; }
            get { return _Description; }
        }

        public Int32 PermitDetails_Status
        {
            set { _PermitDetails_Status = value; }
            get { return _PermitDetails_Status; }
        }

        public Int32 PermitUserMappings_Status
        {
            set { _PermitUserMappings_Status = value; }
            get { return _PermitUserMappings_Status; }
        }

        public Int32 Permits_Status
        {
            set { _Permits_Status = value; }
            get { return _Permits_Status; }
        }

        public Int32 SystemUsers_Status
        {
            set { _SystemUsers_Status = value; }
            get { return _SystemUsers_Status; }
        }

        public String Email
        {
            set { _Email = value; }
            get { return _Email; }
        }

        public Int32 Type
        {
            set { _Type = value; }
            get { return _Type; }
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
            var str = String.Format("vw_PermitViewAll information:");
            str += Environment.NewLine + "UserId: " + _UserId;
            str += Environment.NewLine + "Username: " + _Username;
            str += Environment.NewLine + "UserGroup: " + _UserGroup;
            str += Environment.NewLine + "PermitID: " + _PermitID;
            str += Environment.NewLine + "PermitName: " + _PermitName;
            str += Environment.NewLine + "PageURL: " + _PageURL;
            str += Environment.NewLine + "IsInsert: " + _IsInsert;
            str += Environment.NewLine + "IsView: " + _IsView;
            str += Environment.NewLine + "IsUpdate: " + _IsUpdate;
            str += Environment.NewLine + "IsDelete: " + _IsDelete;
            str += Environment.NewLine + "IsSpecial: " + _IsSpecial;
            str += Environment.NewLine + "Description: " + _Description;
            str += Environment.NewLine + "PermitDetails_Status: " + _PermitDetails_Status;
            str += Environment.NewLine + "PermitUserMappings_Status: " + _PermitUserMappings_Status;
            str += Environment.NewLine + "Permits_Status: " + _Permits_Status;
            str += Environment.NewLine + "SystemUsers_Status: " + _SystemUsers_Status;
            str += Environment.NewLine + "Email: " + _Email;
            str += Environment.NewLine + "Type: " + _Type;
            return str;
        }

        #endregion Override methods
    }
}