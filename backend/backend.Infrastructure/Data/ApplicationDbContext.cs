using System;
using backend.Application.Abstractions.Persistence;
using backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace backend.Infrastructure.Data
{
    public partial class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AppSetting> AppSettings { get; set; }
        public virtual DbSet<Autochasing> Autochasings { get; set; }
        public virtual DbSet<BulkChasingEmailbuffer> BulkChasingEmailbuffers { get; set; }
        public virtual DbSet<BusinessSource> BusinessSources { get; set; }
        public virtual DbSet<ChangeLog> ChangeLogs { get; set; }
        public virtual DbSet<ChasingLetter> ChasingLetters { get; set; }
        public virtual DbSet<CheckListItem> CheckListItems { get; set; }
        public virtual DbSet<ContactDatum> ContactData { get; set; }
        public virtual DbSet<ContactNote> ContactNotes { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<CustomerHistory> CustomerHistories { get; set; }
        public virtual DbSet<Debug> Debugs { get; set; }
        public virtual DbSet<Document> Documents { get; set; }
        public virtual DbSet<Emailreport> Emailreports { get; set; }
        public virtual DbSet<EquipmentCondition> EquipmentConditions { get; set; }
        public virtual DbSet<EquipmentType> EquipmentTypes { get; set; }
        public virtual DbSet<Lease> Leases { get; set; }
        public virtual DbSet<LeaseCheckListItem> LeaseCheckListItems { get; set; }
        public virtual DbSet<LeaseHistory> LeaseHistories { get; set; }
        public virtual DbSet<LeaseItem> LeaseItems { get; set; }
        public virtual DbSet<LeasePaymentPoint> LeasePaymentPoints { get; set; }
        public virtual DbSet<MarketingUrl> MarketingUrls { get; set; }
        public virtual DbSet<PaymentFrequency> PaymentFrequencies { get; set; }
        public virtual DbSet<PrintDoc> PrintDocs { get; set; }
        public virtual DbSet<Report> Reports { get; set; }
        public virtual DbSet<Reportfilter> Reportfilters { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Sage3> Sage3s { get; set; }
        public virtual DbSet<Sector> Sectors { get; set; }
        public virtual DbSet<Setcompany> Setcompanies { get; set; }
        public virtual DbSet<StandardLetter> StandardLetters { get; set; }
        public virtual DbSet<Total> Totals { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Permission> Permissions { get; set; }
        public virtual DbSet<RolePermission> RolePermissions { get; set; }
        public virtual DbSet<UserPermission> UserPermissions { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<AppSetting>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Autochasing>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("autochasing");

                entity.Property(e => e.Lastautochasing)
                    .HasColumnType("datetime")
                    .HasColumnName("lastautochasing");

                entity.Property(e => e.Status)
                    .HasMaxLength(10)
                    .HasColumnName("status");

                entity.Property(e => e.Username)
                    .HasMaxLength(100)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<BulkChasingEmailbuffer>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("BulkChasingEmailbuffer");

                entity.Property(e => e.Bodytext).HasColumnName("bodytext");

                entity.Property(e => e.ChasingdocFile)
                    .HasMaxLength(100)
                    .HasColumnName("chasingdocFile");

                entity.Property(e => e.Emailheader).HasColumnName("emailheader");

                entity.Property(e => e.Invoicefile)
                    .HasMaxLength(100)
                    .HasColumnName("invoicefile");

                entity.Property(e => e.Ppid).HasColumnName("ppid");

                entity.Property(e => e.Sendemail).HasColumnName("sendemail");

                entity.Property(e => e.Username)
                    .HasMaxLength(10)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<BusinessSource>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.Key)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.NoRrr).HasColumnName("NoRRR");

                entity.Property(e => e.ParentId).HasColumnName("ParentID");

                entity.Property(e => e.Putby).HasMaxLength(2);

                entity.Property(e => e.Puttype)
                    .HasMaxLength(10)
                    .HasColumnName("puttype");

                entity.Property(e => e.Putvalue).HasColumnType("money");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("FK_BusinessSources_BusinessSources");
            });

            modelBuilder.Entity<ChangeLog>(entity =>
            {
                entity.ToTable("ChangeLog");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Change).IsRequired();

                entity.Property(e => e.ModificationTimestamp).HasColumnType("datetime");

                entity.Property(e => e.RecordId).HasColumnName("RecordID");

                entity.Property(e => e.TableName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<ChasingLetter>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.DocumentId).HasColumnName("DocumentID");

                entity.Property(e => e.GenerationDate).HasColumnType("datetime");

                entity.Property(e => e.LatePaymentInvoiceDocumentId).HasColumnName("LatePaymentInvoiceDocumentID");

                entity.Property(e => e.LeasePaymentPointId).HasColumnName("LeasePaymentPointID");

                entity.Property(e => e.TemplateId).HasColumnName("TemplateID");

                entity.HasOne(d => d.LeasePaymentPoint)
                    .WithMany(p => p.ChasingLetters)
                    .HasForeignKey(d => d.LeasePaymentPointId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChasingLetters_LeasePaymentPoints");

                entity.HasOne(d => d.Template)
                    .WithMany(p => p.ChasingLetters)
                    .HasForeignKey(d => d.TemplateId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ChasingLetters_StandardLetters");
            });

            modelBuilder.Entity<CheckListItem>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Key)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.ParentId).HasColumnName("ParentID");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("FK_CheckListItems_CheckListItems");
            });

            modelBuilder.Entity<ContactDatum>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.AccountRef)
                    .IsRequired()
                    .HasMaxLength(8)
                    .HasColumnName("Account_Ref");

                entity.Property(e => e.Dontautoasign).HasColumnName("dontautoasign");

                entity.Property(e => e.EmailAddress).HasColumnName("Email_Address");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .HasColumnName("First_Name");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Lastemail)
                    .HasColumnType("datetime")
                    .HasColumnName("lastemail");

                entity.Property(e => e.Notes).HasColumnName("notes");

                entity.Property(e => e.NotesId).HasColumnName("NotesID");

                entity.Property(e => e.OtherNames)
                    .HasMaxLength(100)
                    .HasColumnName("Other_Names");

                entity.Property(e => e.Position).HasMaxLength(100);

                entity.Property(e => e.Telephone).HasMaxLength(50);

                entity.Property(e => e.Title).HasMaxLength(5);
            });

            modelBuilder.Entity<ContactNote>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Custref)
                    .HasMaxLength(8)
                    .HasColumnName("custref");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.Nextcall).HasColumnType("datetime");

                entity.Property(e => e.NotesType).HasMaxLength(2);

                entity.Property(e => e.Ppid).HasColumnName("PPid");

                entity.Property(e => e.Timestamp).HasColumnType("datetime");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AccountRef)
                    .IsRequired()
                    .HasMaxLength(8)
                    .HasColumnName("Account_Ref");

                entity.Property(e => e.InvAddress1)
                    .HasMaxLength(100)
                    .HasColumnName("Inv_address1");

                entity.Property(e => e.InvAddress2)
                    .HasMaxLength(100)
                    .HasColumnName("Inv_address2");

                entity.Property(e => e.InvAddress3)
                    .HasMaxLength(100)
                    .HasColumnName("Inv_address3");

                entity.Property(e => e.InvAddress4)
                    .HasMaxLength(100)
                    .HasColumnName("Inv_address4");

                entity.Property(e => e.InvAddress5)
                    .HasMaxLength(100)
                    .HasColumnName("Inv_address5");

                entity.Property(e => e.InvName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("inv_name");

                entity.Property(e => e.LegalStatusId).HasColumnName("LegalStatusID");

                entity.Property(e => e.Paperless).HasColumnName("paperless");

                entity.Property(e => e.PrimaryContactId).HasColumnName("PrimaryContactID");

                entity.Property(e => e.SageAddress1)
                    .HasMaxLength(100)
                    .HasColumnName("sage_address_1");

                entity.Property(e => e.SageAddress2)
                    .HasMaxLength(100)
                    .HasColumnName("sage_address_2");

                entity.Property(e => e.SageAddress3)
                    .HasMaxLength(100)
                    .HasColumnName("sage_address_3");

                entity.Property(e => e.SageAddress4)
                    .HasMaxLength(100)
                    .HasColumnName("sage_address_4");

                entity.Property(e => e.SageAddress5)
                    .HasMaxLength(100)
                    .HasColumnName("sage_address_5");

                entity.Property(e => e.SageBalance)
                    .HasColumnType("money")
                    .HasColumnName("sage_balance");

                entity.Property(e => e.SageDelAddress1)
                    .HasMaxLength(100)
                    .HasColumnName("sage_del_address_1");

                entity.Property(e => e.SageDelAddress2)
                    .HasMaxLength(100)
                    .HasColumnName("sage_del_address_2");

                entity.Property(e => e.SageDelAddress3)
                    .HasMaxLength(100)
                    .HasColumnName("sage_del_address_3");

                entity.Property(e => e.SageDelAddress4)
                    .HasMaxLength(100)
                    .HasColumnName("sage_del_address_4");

                entity.Property(e => e.SageDelAddress5)
                    .HasMaxLength(100)
                    .HasColumnName("sage_del_address_5");

                entity.Property(e => e.SageEMail)
                    .HasMaxLength(100)
                    .HasColumnName("sage_e_mail");

                entity.Property(e => e.SageLastpaid)
                    .HasColumnType("date")
                    .HasColumnName("sage_lastpaid");

                entity.Property(e => e.SageName)
                    .HasMaxLength(100)
                    .HasColumnName("sage_name");

                entity.Property(e => e.SageWww)
                    .HasMaxLength(100)
                    .HasColumnName("sage_www");

                entity.Property(e => e.SecondaryContactId).HasColumnName("SecondaryContactID");

                entity.Property(e => e.SectorId).HasColumnName("SectorID");

                entity.HasOne(d => d.LegalStatus)
                    .WithMany(p => p.CustomerLegalStatuses)
                    .HasForeignKey(d => d.LegalStatusId)
                    .HasConstraintName("FK_Customers_Sectors1");

                entity.HasOne(d => d.Sector)
                    .WithMany(p => p.CustomerSectors)
                    .HasForeignKey(d => d.SectorId)
                    .HasConstraintName("FK_Customers_Sectors");
            });

            modelBuilder.Entity<CustomerHistory>(entity =>
            {
                entity.ToTable("CustomerHistory");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.Description).IsRequired();

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.CustomerHistories)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CustomerNotes_Customers");
            });

            modelBuilder.Entity<Debug>(entity =>
            {
                entity.ToTable("Debug");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Message).IsRequired();

                entity.Property(e => e.Timestamp).HasColumnType("datetime");
            });

            modelBuilder.Entity<Document>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AccountRef)
                    .IsRequired()
                    .HasMaxLength(8)
                    .HasColumnName("Account_Ref");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.FileExtension)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LeaseId).HasColumnName("LeaseID");

                entity.HasOne(d => d.Lease)
                    .WithMany(p => p.Documents)
                    .HasForeignKey(d => d.LeaseId)
                    .HasConstraintName("FK_LeaseDocuments_Leases");
            });

            modelBuilder.Entity<Emailreport>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("emailreport");

                entity.Property(e => e.Attachment1)
                    .HasMaxLength(100)
                    .HasColumnName("attachment1");

                entity.Property(e => e.Attachment2)
                    .HasMaxLength(100)
                    .HasColumnName("attachment2");

                entity.Property(e => e.Attachment3)
                    .HasMaxLength(100)
                    .HasColumnName("attachment3");

                entity.Property(e => e.Body).HasColumnName("body");

                entity.Property(e => e.Contactname)
                    .HasMaxLength(500)
                    .HasColumnName("contactname");

                entity.Property(e => e.Custref)
                    .HasMaxLength(8)
                    .HasColumnName("custref");

                entity.Property(e => e.Emailaddress)
                    .HasMaxLength(200)
                    .HasColumnName("emailaddress");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Subject)
                    .HasMaxLength(200)
                    .HasColumnName("subject");

                entity.Property(e => e.Timestamp)
                    .HasColumnType("datetime")
                    .HasColumnName("timestamp");

                entity.Property(e => e.Username)
                    .HasMaxLength(20)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<EquipmentCondition>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.Key)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<EquipmentType>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.Key)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<Lease>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AccountRef)
                    .IsRequired()
                    .HasMaxLength(8)
                    .HasColumnName("Account_Ref");

                entity.Property(e => e.AnnualServiceFeeAmount).HasColumnType("money");

                entity.Property(e => e.BusinessSourceId).HasColumnName("BusinessSourceID");

                entity.Property(e => e.BusinessSourceItemId).HasColumnName("BusinessSourceItemID");

                entity.Property(e => e.ContactEpcchasingLetter1)
                    .HasColumnName("ContactEPCChasingLetter1")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ContactEpcchasingLetter2)
                    .HasColumnName("ContactEPCChasingLetter2")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ContactEpcchasingLetter3)
                    .HasColumnName("ContactEPCChasingLetter3")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ContactLatePaymentChasingLetter3).HasDefaultValueSql("((1))");

                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");

                entity.Property(e => e.Description).HasMaxLength(250);

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.FacilityFeeAmount).HasColumnType("money");

                entity.Property(e => e.InsuranceDocumentId).HasColumnName("InsuranceDocumentID");

                entity.Property(e => e.Leasetype).HasColumnName("leasetype");

                entity.Property(e => e.LegalStatusId).HasColumnName("LegalStatusID");

                entity.Property(e => e.PaymentAmount).HasColumnType("money");

                entity.Property(e => e.PaymentStartDate).HasColumnType("datetime");

                entity.Property(e => e.Pepfee).HasColumnName("PEPFee");

                entity.Property(e => e.PepfeeAmount)
                    .HasColumnType("money")
                    .HasColumnName("PEPFeeAmount");

                entity.Property(e => e.Putletterid).HasColumnName("putletterid");

                entity.Property(e => e.Rrrfrequency).HasColumnName("RRRfrequency");

                entity.Property(e => e.Rrrs).HasColumnName("RRRs");

                entity.Property(e => e.RrrsagreementDocId).HasColumnName("RRRsagreementDocID");

                entity.Property(e => e.Rrrstartdate)
                    .HasColumnType("date")
                    .HasColumnName("RRRstartdate");

                entity.Property(e => e.SectorId).HasColumnName("SectorID");

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.SupplierInvoiceValue).HasColumnType("money");

                entity.Property(e => e.TerminationNotifiedDate).HasColumnType("datetime");

                entity.Property(e => e.Terminationnoticeid).HasColumnName("terminationnoticeid");

                entity.HasOne(d => d.BusinessSource)
                    .WithMany(p => p.LeaseBusinessSources)
                    .HasForeignKey(d => d.BusinessSourceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Leases_BusinessSources");

                entity.HasOne(d => d.BusinessSourceItem)
                    .WithMany(p => p.LeaseBusinessSourceItems)
                    .HasForeignKey(d => d.BusinessSourceItemId)
                    .HasConstraintName("FK_Leases_BusinessSources1");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Leases)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Leases_Customers");

                entity.HasOne(d => d.LegalStatus)
                    .WithMany(p => p.LeaseLegalStatuses)
                    .HasForeignKey(d => d.LegalStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Leases_Sectors1");

                entity.HasOne(d => d.Sector)
                    .WithMany(p => p.LeaseSectors)
                    .HasForeignKey(d => d.SectorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Leases_Sectors");
            });

            modelBuilder.Entity<LeaseCheckListItem>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Category)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.CheckListItemId).HasColumnName("CheckListItemID");

                entity.Property(e => e.EditedBy).HasMaxLength(150);

                entity.Property(e => e.EditedDate).HasColumnType("datetime");

                entity.Property(e => e.LeaseId).HasColumnName("LeaseID");

                entity.HasOne(d => d.CheckListItem)
                    .WithMany(p => p.LeaseCheckListItems)
                    .HasForeignKey(d => d.CheckListItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LeaseCheckListItems_CheckListItems1");

                entity.HasOne(d => d.Lease)
                    .WithMany(p => p.LeaseCheckListItems)
                    .HasForeignKey(d => d.LeaseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LeaseCheckListItems_Leases");
            });

            modelBuilder.Entity<LeaseHistory>(entity =>
            {
                entity.ToTable("LeaseHistory");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.DocumentId).HasColumnName("DocumentID");

                entity.Property(e => e.LeaseId).HasColumnName("LeaseID");

                entity.Property(e => e.PaymentPointId).HasColumnName("PaymentPointID");

                entity.HasOne(d => d.Document)
                    .WithMany(p => p.LeaseHistories)
                    .HasForeignKey(d => d.DocumentId)
                    .HasConstraintName("FK_LeaseHistory_LeaseDocuments");

                entity.HasOne(d => d.Lease)
                    .WithMany(p => p.LeaseHistories)
                    .HasForeignKey(d => d.LeaseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LeaseHistory_Leases");

                entity.HasOne(d => d.PaymentPoint)
                    .WithMany(p => p.LeaseHistories)
                    .HasForeignKey(d => d.PaymentPointId)
                    .HasConstraintName("FK_LeaseHistory_LeasePaymentPoints");
            });

            modelBuilder.Entity<LeaseItem>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.EquipmentConditionId).HasColumnName("EquipmentConditionID");

                entity.Property(e => e.EquipmentTypeId).HasColumnName("EquipmentTypeID");

                entity.Property(e => e.LeaseId).HasColumnName("LeaseID");

                entity.Property(e => e.Make).HasMaxLength(250);

                entity.HasOne(d => d.EquipmentCondition)
                    .WithMany(p => p.LeaseItems)
                    .HasForeignKey(d => d.EquipmentConditionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LeaseItems_EquipmentConditions");

                entity.HasOne(d => d.EquipmentType)
                    .WithMany(p => p.LeaseItems)
                    .HasForeignKey(d => d.EquipmentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LeaseItems_EquipmentTypes");

                entity.HasOne(d => d.Lease)
                    .WithMany(p => p.LeaseItems)
                    .HasForeignKey(d => d.LeaseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LeaseItems_Leases");
            });

            modelBuilder.Entity<LeasePaymentPoint>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AccountRef)
                    .IsRequired()
                    .HasMaxLength(8)
                    .HasColumnName("Account_Ref");

                entity.Property(e => e.AmountPaid)
                    .HasMaxLength(20)
                    .HasColumnName("amount_paid");

                entity.Property(e => e.AnnualServiceFeeAmount).HasColumnType("money");

                entity.Property(e => e.DatePaid)
                    .HasColumnType("date")
                    .HasColumnName("date_paid");

                entity.Property(e => e.FacilityFeeAmount).HasColumnType("money");

                entity.Property(e => e.InvoiceDate).HasColumnType("datetime");

                entity.Property(e => e.InvoiceDocumentId).HasColumnName("InvoiceDocumentID");

                entity.Property(e => e.InvoiceTotal).HasColumnType("money");

                entity.Property(e => e.LatePaymentAdministrationChargesAmount).HasColumnType("money");

                entity.Property(e => e.LatePaymentInterestChargesAmount).HasColumnType("money");

                entity.Property(e => e.LatePaymentInvoiceDocumentId).HasColumnName("LatePaymentInvoiceDocumentID");

                entity.Property(e => e.LeaseId).HasColumnName("LeaseID");

                entity.Property(e => e.ManualPaidCorrection).HasColumnName("manual_paid_correction");

                entity.Property(e => e.PaymentDate).HasColumnType("datetime");

                entity.Property(e => e.Pepfee).HasColumnName("PEPFee");

                entity.Property(e => e.PepfeeAmount)
                    .HasColumnType("money")
                    .HasColumnName("PEPFeeAmount");

                entity.Property(e => e.RemAdvReceivedDate).HasColumnType("datetime");

                entity.Property(e => e.RentalAmount).HasColumnType("money");

                entity.Property(e => e.SettlementAmount).HasColumnType("money");

                entity.HasOne(d => d.Lease)
                    .WithMany(p => p.LeasePaymentPoints)
                    .HasForeignKey(d => d.LeaseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LeasePaymentPoints_Leases");
            });

            modelBuilder.Entity<MarketingUrl>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("MarketingURLs");

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Mdescription).HasColumnName("mdescription");

                entity.Property(e => e.ResultUrl).HasColumnName("ResultURL");

                entity.Property(e => e.Urlemailtext)
                    .HasMaxLength(100)
                    .HasColumnName("URLEmailtext");

                entity.Property(e => e.Urlstr).HasColumnName("URLstr");
            });

            modelBuilder.Entity<PaymentFrequency>(entity =>
            {
                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<PrintDoc>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Docname)
                    .HasMaxLength(100)
                    .HasColumnName("docname");

                entity.Property(e => e.TemplateId).HasColumnName("templateID");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.GridData).IsRequired();

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Reportfilter>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("reportfilter");

                entity.Property(e => e.Filtername)
                    .HasMaxLength(50)
                    .HasColumnName("filtername");

                entity.Property(e => e.Filterquery).HasColumnName("filterquery");

                entity.Property(e => e.Reportname)
                    .HasMaxLength(50)
                    .HasColumnName("reportname");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Sage3>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("sage3");

                entity.Property(e => e.Amountpaid).HasColumnName("amountpaid");

                entity.Property(e => e.Custref).HasColumnName("custref");

                entity.Property(e => e.Datepaid).HasColumnName("datepaid");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Details).HasColumnName("details");

                entity.Property(e => e.Invoicefoundinsystem)
                    .HasMaxLength(10)
                    .HasColumnName("invoicefoundinsystem");

                entity.Property(e => e.Invoicenumber).HasColumnName("invoicenumber");

                entity.Property(e => e.Net).HasColumnName("net");

                entity.Property(e => e.Tax).HasColumnName("tax");

                entity.Property(e => e.Transactionnumber).HasColumnName("transactionnumber");
            });

            modelBuilder.Entity<Sector>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.Key)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.ParentId).HasColumnName("ParentID");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("FK_Sectors_Sectors");
            });

            modelBuilder.Entity<Setcompany>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("setcompany");

                entity.Property(e => e.Address1)
                    .HasMaxLength(100)
                    .HasColumnName("address1");

                entity.Property(e => e.Address2)
                    .HasMaxLength(100)
                    .HasColumnName("address2");

                entity.Property(e => e.Address3)
                    .HasMaxLength(100)
                    .HasColumnName("address3");

                entity.Property(e => e.Address4)
                    .HasMaxLength(100)
                    .HasColumnName("address4");

                entity.Property(e => e.Address5)
                    .HasMaxLength(100)
                    .HasColumnName("address5");

                entity.Property(e => e.Companycode).HasMaxLength(8);

                entity.Property(e => e.ContactTelephone1).HasMaxLength(50);

                entity.Property(e => e.ContactTelephone2).HasMaxLength(50);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.RegNumber)
                    .HasMaxLength(50)
                    .HasColumnName("regNumber");

                entity.Property(e => e.VatNumber).HasMaxLength(50);

                entity.Property(e => e.Website)
                    .HasMaxLength(100)
                    .HasColumnName("website");
            });

            modelBuilder.Entity<StandardLetter>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<Total>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("totals");

                entity.Property(e => e.AccountRef)
                    .HasMaxLength(8)
                    .HasColumnName("account_ref");

                entity.Property(e => e.Amountpaid)
                    .HasColumnType("money")
                    .HasColumnName("amountpaid");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Invoicenumber).HasColumnName("invoicenumber");

                entity.Property(e => e.Invoicetotal)
                    .HasColumnType("money")
                    .HasColumnName("invoicetotal");

                entity.Property(e => e.Invoicetype).HasColumnName("invoicetype");

                entity.Property(e => e.Latepaymentinvoicenumber)
                    .HasColumnType("money")
                    .HasColumnName("latepaymentinvoicenumber");

                entity.Property(e => e.Leaseid).HasColumnName("leaseid");

                entity.Property(e => e.Paymentdate)
                    .HasColumnType("date")
                    .HasColumnName("paymentdate");

                entity.Property(e => e.Ppid).HasColumnName("ppid");

                entity.Property(e => e.Settlementamount)
                    .HasColumnType("money")
                    .HasColumnName("settlementamount");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Department)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Position)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Pword)
                    .HasMaxLength(100)
                    .HasColumnName("pword");

                entity.Property(e => e.RealName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.Signature)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Users_Roles");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
