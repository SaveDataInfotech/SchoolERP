import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LayoutComponent implements OnInit {
  condition: boolean = true;
  username: any = localStorage.getItem("userid")

  constructor(private router: Router) { }

  ngOnInit() { console.log('current Application Login Role:::' + this.currentLoginRole) }

  currentLoginRole: any = localStorage.getItem("rolename")

  openSidebar: boolean = true;
  routerLink = "/login"
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  superAdminmenuSidebar = [
    {
      link_name: "Dashboard",
      link: "dashboard",
      icon: "bx bx-grid-alt",
      sub_menu: []
    },
    {
      link_name: "schedule",
      link: "schedule/schedule",
      icon: "studentdetails",
      sub_menu: [
        // {
        //   link_name:"schedule",
        //   link:"schedule/schedule",
        // },
      ]
    },
    {
      link_name: "Student Details",
      link: null,
      icon: "studentdetails",
      sub_menu: [
        {
          link_name: "Student Enquiry",
          link: "student/student_enquiry",
        },
        {
          link_name: "Student Profile",
          link: "student/student_profile",
        },
        {
          link_name: "Edit Student",
          link: "student/student_update",
        },
        {
          link_name: "Student Attendance",
          link: "student/student_attendance",
        },
        {
          link_name: "Student Mark Entry",
          link: "student/student_mark_entry",
        },
        {
          link_name: "Student Tc Apply",
          link: "student/student_tc_applie",
        },
        {
          link_name: "Student Promote",
          link: "student/student_promote",
        },
        {
          link_name: "Student Reports",
          link: "student/reports",
        }

      ]
    },
    {
      link_name: "User",
      link: "user/user",
      icon: "studentdetails",
      sub_menu: [
        // {
        //   link_name:"schedule",
        //   link:"schedule/schedule",
        // },
      ]
    },]


  AdminmenuSidebar = [
    {
      link_name: "Dashboard",
      link: "dashboard/dashboard",
      icon: "bx bx-grid-alt",
      sub_menu: []
    },
    {
      link_name: "schedule",
      link: "schedule/schedule",
      icon: "studentdetails",
      sub_menu: [

      ]
    },

    {
      link_name: "Student Details",
      link: null,
      icon: "studentdetails",
      sub_menu: [
        {
          link_name: "Student Registration",
          link: "student/student_enquiry",
        },
        {
          link_name: "Student Profile",
          link: "student/student_profile",
        },
        {
          link_name: "Edit Student",
          link: "student/student_update",
        },
        {
          link_name: "Student Attendance",
          link: "student/student_attendance",
        },
        // {
        //   link_name: "Student Mark Entry",
        //   link: "student/student_mark_entry",
        // },
        // {
        //   link_name: "Mark Entry Grade Type",
        //   link: "student/mark_entry_grade",
        // },
        {
          link_name: "Student Tc Apply",
          link: "student/student_tc_applie",
        },
        {
          link_name: "Student Promote",
          link: "student/student_promote",
        },
        {
          link_name: "Student Reports",
          link: "student/reports",
        }

      ]
    },
    {
      link_name: "Staff Details",
      link: null,
      icon: "staffdetails",
      sub_menu: [
        {
          link_name: "Staff Profile",
          link: "staff/staff_profile",
        }, {
          link_name: "Staff Assign",
          link: "staff/staff_assign",
        }, {
          link_name: "Staff Attendance",
          link: "staff/staff_attendance",
        }, {
          link_name: "Staff Leave/Permission",
          link: "staff/staff_permission",
        },
        {
          link_name: "Staff Loan Section",
          link: "staff/staff_loan",
        },
        {
          link_name: "Staff Salary",
          link: "staff/staff_salary",
        },
        {
          link_name: "Staff Reports",
          link: "staff/reports",
        }
      ]
    },
    {
      link_name: "Hostel Details",
      link: null,
      icon: "hostel",
      sub_menu: [
        {
          link_name: "Room Allotment",
          link: "hostel/room_allotment",
        },
        {
          link_name: "Room Assign",
          link: "hostel/room_assign",
        },
        {
          link_name: "Hostel Attendance",
          link: "hostel/hostel_attendance",
        },
        {
          link_name: "Hostel Reports",
          link: "hostel/reports",
        }
      ]
    },
    {
      link_name: "Library",
      link: null,
      icon: "hostel",
      sub_menu: [
        {
          link_name: "Add Books",
          link: "library/add_data"
        },
        {
          link_name: "Book Purchase",
          link: "library/book_purchase"
        },
        {
          link_name: "NewStock IN",
          link: "library/newstock_in"
        },
        {
          link_name: "Student Enrollment",
          link: "library/student_enrollment"
        },
        {
          link_name: "Staff Enrollment",
          link: "library/staff_enrollment"
        },
        {
          link_name: "Book Issue",
          link: "library/book_issue"
        },
        {
          link_name: "Return Books",
          link: "library/return_books"
        },
        {
          link_name: "Stock Details",
          link: "library/stocks"
        }
      ]
    },
    {
      link_name: "Finance",
      link: null,
      icon: "schoolfinance",
      sub_menu: [
        {
          link_name: "Fees Collection",
          link: "fees_collection/student_fees",
        },
        {
          link_name: "Hostel Fees Collection",
          link: "fees_collection/student_hostel_fees",
        },
        {
          link_name: "Expense Entry",
          link: "fees_collection/expense-entry",
        },
        {
          link_name: "Fees Collection Reports",
          link: "fees_collection/reports",
        }
      ]
    },
    {
      link_name: "Purchase Entry",
      link: null,
      icon: "customer",
      sub_menu: [
        {
          link_name: "GRN Entry",
          link: "purchase_entry/grn-entry",
        },
        {
          link_name: "Payment Entry",
          link: "purchase_entry/payment-entry",
        },
        {
          link_name: "Purchase Reports",
          link: "purchase_entry/reports",
        }
      ]
    },
    {
      link_name: "Vehicle Entry",
      link: null,
      icon: "schoolvehicle",
      sub_menu: [
        {
          link_name: "Vehicle Details",
          link: "vehicle/vehicle-details",
        },
        {
          link_name: "Vehicle Assign",
          link: "vehicle/vehicle-assign",
        },
        {
          link_name: "Vehicle Distance",
          link: "vehicle/vehicle-distance",
        },
        {
          link_name: "Vehicle Attendance",
          link: "vehicle/vehicle-attendance",
        },
        {
          link_name: "Vehicle Expense",
          link: "vehicle/vehicle-expense",
        },
        {
          link_name: "Vehicle Reports",
          link: "vehicle/reports",
        }
      ]
    },

    {
      link_name: "Master",
      link: null,
      icon: "schoolmaster",
      sub_menu: [
        {
          link_name: "Class Master",
          link: "master/class",
        },
        {
          link_name: "Batch Year",
          link: "master/batch_year"
        },
        {
          link_name: "Fees Master",
          link: "master/fees_master"
        },
        {
          link_name: "Subject Master",
          link: "master/subject_master"
        },
        {
          link_name: "Subject Assign",
          link: "master/subject_assign"
        },
        {
          link_name: "Book Master",
          link: "master/library_book_master"
        },
        {
          link_name: "Uniform Master",
          link: "master/uniform_master"
        },
        {
          link_name: "Staff Type",
          link: "master/staff_type"
        },
        {
          link_name: "Leave Master",
          link: "master/leave_master"
        },
        {
          link_name: "Hostel Master",
          link: "master/hostel_master"
        },
        {
          link_name: "Vehicle Master",
          link: "master/vehicle_master"
        },
        {
          link_name: "Supplier Type",
          link: "master/supplier_master"
        },
        {
          link_name: "Role",
          link: "master/role"
        },
        {
          link_name: "Reports",
          link: "master/reports"
        }
      ]
    },
    {
      link_name: "Customer",
      link: null,
      icon: "customer",
      sub_menu: [
        {
          link_name: "New Customer",
          link: "customer/create_customer",
        }, {
          link_name: "Customer Details",
          link: "customer/customer_details",
        }, {
          link_name: "Customer Report",
          link: "customer/customer_report",
        }, {
          link_name: "Guardian Master",
          link: "master/create_guardian",
        },

      ]
    },
    {
      link_name: "User",
      link: "user/user",
      icon: "studentdetails",
      sub_menu: [

      ]
    },


    // {
    //   link_name: "Admin",
    //   link: null,
    //   icon: "admin",
    //   sub_menu: [
    //     {
    //       link_name: "Company Details",
    //       link: "/app/admin/company-details",
    //     }, {
    //       link_name: "User Details",
    //       link: "/app/admin/user-details",
    //     }, {
    //       link_name: "User Group",
    //       link: "/app/admin/user-group",
    //     }, {
    //       link_name: "User Rights",
    //       link: "/app/admin/user-rights",
    //     }
    //   ]
    // },


  ]



  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }
}