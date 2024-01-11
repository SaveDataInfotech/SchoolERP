import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { userProfileService } from '../api-service/userProfile.service';
import { DialogService } from '../api-service/Dialog.service';
import { backUPDBService } from '../api-service/backUPDB.service';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LayoutComponent implements OnInit {
  condition: boolean = true;
  userID: any = localStorage.getItem("userid");
  mainMenu: any;
  subMenu: any;
  filteredMenu: any[];
  userName: string;
  userList: any[] = [];
  userImage: string;
  constructor(private router: Router,
    private userSvc: userProfileService,
    private DialogSvc: DialogService,
    private dBSvc: backUPDBService,
    private notificationSvc: NotificationsService) { }

  ngOnInit() {
    this.userSvc.getUserList(Number(this.userID)).subscribe(data => {
      this.userList = data;
      if (this.userList) {

        this.mainMenu = this.userList[0].main_menus
        this.subMenu = this.userList[0].sub_menus
        this.userName = this.userList[0].user_name
        this.userImage = this.userList[0].img
        this.filteredMenu = this.AdminmenuSidebar

          .filter(menu => this.mainMenu.includes(menu.value))
          .map(menu => {
            const filteredSubmenu = menu.sub_menu.filter(submenu => this.subMenu.includes(submenu.value));
            return { ...menu, sub_menu: filteredSubmenu };
          });
      }
    });
  }

  openSidebar: boolean = true;
  routerLink = "/login"
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  backUpDB() {
    this.DialogSvc.openConfirmDialog('Are you sure want to BACK UP this DB ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.dBSvc.backupDB().subscribe(res => {

            if (res.status == 'BackUp Success') {
              this.notificationSvc.success(" BACK UP Success");
            }
            else {
              this.notificationSvc.error(res.status);
            }
          });
        }
      });
  }


  AdminmenuSidebar = [
    {
      link_name: "Dashboard",
      link: "dashboard/dashboard",
      icon: "bx bx-grid-alt",
      isselect: false,
      value: 1,
      sub_menu: []
    },
    {
      link_name: "schedule",
      link: "schedule/schedule",
      icon: "studentdetails",
      isselect: false,
      value: 2,
      sub_menu: [

      ]
    },

    {
      link_name: "Student Details",
      link: null,
      icon: "studentdetails",
      isselect: false,
      value: 3,
      sub_menu: [
        {
          link_name: "Student Registration",
          link: "student/student_enquiry",
          isselect: false,
          value: 31
        },
        {
          link_name: "Student Profile",
          link: "student/student_profile",
          isselect: false,
          value: 32
        },
        // {
        //   link_name: "Update Student Profile",
        //   link: "student/student_update",
        //   isselect: false,
        //   value: 33
        // },
        {
          link_name: "Student Attendance",
          link: "student/student_attendance",
          isselect: false,
          value: 34
        },
        {
          link_name: "Student Mark Entry",
          link: "student/student_mark_entry",
          isselect: false,
          value: 35
        },
        // {
        //   link_name: "Mark Entry Grade Type",
        //   link: "student/mark_entry_grade",
        // isselect:false,
        //value:36
        // },
        {
          link_name: "Student Tc Apply",
          link: "student/student_tc_applie",
          isselect: false,
          value: 37
        },
        {
          link_name: "Student Promote",
          link: "student/student_promote",
          isselect: false,
          value: 38
        },
        // {
        //   link_name: "SMS",
        //   link: "student/sms",
        //   isselect: false,
        //   value: 39
        // },
        {
          link_name: "Student Reports",
          link: "student/reports",
          isselect: false,
          value: 391
        },
        {
          link_name: "Mark Entry Reports",
          link: "student/mark_entry_reports",
          isselect: false,
          value: 392
        }
      ]
    },
    {
      link_name: "Staff Details",
      link: null,
      icon: "staffdetails",
      isselect: false,
      value: 4,
      sub_menu: [
        {
          link_name: "Staff Profile",
          link: "staff/staff_profile",
          isselect: false,
          value: 41
        }, {
          link_name: "Staff Assign",
          link: "staff/staff_assign",
          isselect: false,
          value: 42
        }, {
          link_name: "Staff Attendance",
          link: "staff/staff_attendance",
          isselect: false,
          value: 43
        }, {
          link_name: "Staff Leave/Permission",
          link: "staff/staff_permission",
          isselect: false,
          value: 44
        },
        {
          link_name: "Staff Loan Section",
          link: "staff/staff_loan",
          isselect: false,
          value: 45
        },
        {
          link_name: "Staff Salary",
          link: "staff/staff_salary",
          isselect: false,
          value: 46
        },
        {
          link_name: "Staff Reports",
          link: "staff/reports",
          isselect: false,
          value: 47
        }
      ]
    },

    // {
    //   link_name: "Library",
    //   link: null,
    //   icon: "hostel",
    //   isselect: false,
    //   value: 5,
    //   sub_menu: [
    //     {
    //       link_name: "Add Books",
    //       link: "library/add_data",
    //       isselect: false,
    //       value: 51
    //     },
    //     {
    //       link_name: "Book Purchase",
    //       link: "library/book_purchase",
    //       isselect: false,
    //       value: 52
    //     },
    //     {
    //       link_name: "NewStock IN",
    //       link: "library/newstock_in",
    //       isselect: false,
    //       value: 53
    //     },
    //     {
    //       link_name: "Student Enrollment",
    //       link: "library/student_enrollment",
    //       isselect: false,
    //       value: 54
    //     },
    //     {
    //       link_name: "Staff Enrollment",
    //       link: "library/staff_enrollment",
    //       isselect: false,
    //       value: 55
    //     },
    //     {
    //       link_name: "Book Issue",
    //       link: "library/book_issue",
    //       isselect: false,
    //       value: 56
    //     },
    //     {
    //       link_name: "Return Books",
    //       link: "library/return_books",
    //       isselect: false,
    //       value: 57
    //     },
    //     {
    //       link_name: "Stock Details",
    //       link: "library/stocks",
    //       isselect: false,
    //       value: 58
    //     }
    //   ]
    // },
    // {
    //   link_name: "Hostel Details",
    //   link: null,
    //   icon: "hostel",
    //   isselect: false,
    //   value: 6,
    //   sub_menu: [
    //     {
    //       link_name: "Room Allotment",
    //       link: "hostel/room_allotment",
    //       isselect: false,
    //       value: 61
    //     },
    //     {
    //       link_name: "Room Assign",
    //       link: "hostel/room_assign",
    //       isselect: false,
    //       value: 62
    //     },
    //     {
    //       link_name: "Hostel Attendance",
    //       link: "hostel/hostel_attendance",
    //       isselect: false,
    //       value: 63
    //     },
    //     {
    //       link_name: "Hostel Reports",
    //       link: "hostel/reports",
    //       isselect: false,
    //       value: 64
    //     }
    //   ]
    // },
    {
      link_name: "Finance",
      link: null,
      icon: "schoolfinance",
      isselect: false,
      value: 7,
      sub_menu: [
        {
          link_name: "Fees Collection",
          link: "fees_collection/student_fees",
          isselect: false,
          value: 71
        },
        {
          link_name: "Fees Transaction",
          link: "fees_collection/fee_transaction",
          isselect: false,
          value: 72
        },
        {
          link_name: "Day wise Fees collection",
          link: "fees_collection/day_wise_collection",
          isselect: false,
          value: 73
        },
        {
          link_name: "Fees Collection Reports",
          link: "fees_collection/reports",
          isselect: false,
          value: 74
        },
        {
          link_name: "Total Balance Reports",
          link: "fees_collection/totalbalance_reports",
          isselect: false,
          value: 75
        },

        // {
        //   link_name: "Hostel Fees Collection",
        //   link: "fees_collection/student_hostel_fees",
        //isselect:false,
        //value:76
        // },
        // {
        //   link_name: "Expense Entry",
        //   link: "fees_collection/expense-entry",
        //isselect:false,
        //value:77
        // },
        // {
        //   link_name: "Uniform Billing",
        //   link: "fees_collection/uniform_bill",
        //   isselect: false,
        //   value: 78
        // }

        {
          link_name: "Fee Concession Report",
          link: "fees_collection/fee_con_report",
          isselect: false,
          value: 79
        }
      ]
    },
    // {
    //   link_name: "Purchase Entry",
    //   link: null,
    //   icon: "customer",
    //   isselect: false,
    //   value: 8,
    //   sub_menu: [
    //     {
    //       link_name: "GRN Entry",
    //       link: "purchase_entry/grn-entry",
    //       isselect: false,
    //       value: 81
    //     },
    //     {
    //       link_name: "Payment Entry",
    //       link: "purchase_entry/payment-entry",
    //       isselect: false,
    //       value: 82
    //     },
    //     {
    //       link_name: "Purchase Reports",
    //       link: "purchase_entry/reports",
    //       isselect: false,
    //       value: 83
    //     }
    //   ]
    // },
    {
      link_name: "Vehicle Entry",
      link: null,
      icon: "schoolvehicle",
      isselect: false,
      value: 9,
      sub_menu: [
        {
          link_name: "Vehicle Details",
          link: "vehicle/vehicle-details",
          isselect: false,
          value: 91
        },
        {
          link_name: "Vehicle Assign",
          link: "vehicle/vehicle-assign",
          isselect: false,
          value: 92
        },
        {
          link_name: "Vehicle Distance",
          link: "vehicle/vehicle-distance",
          isselect: false,
          value: 93
        },
        {
          link_name: "Vehicle Attendance",
          link: "vehicle/vehicle-attendance",
          isselect: false,
          value: 94
        },
        {
          link_name: "Vehicle Expense",
          link: "vehicle/vehicle-expense",
          isselect: false,
          value: 95
        },
        {
          link_name: "Vehicle Reports",
          link: "vehicle/reports",
          isselect: false,
          value: 96
        }
      ]
    },

    {
      link_name: "Master",
      link: null,
      icon: "schoolmaster",
      isselect: false,
      value: 11,
      sub_menu: [
        {
          link_name: "Calendar Event Assign",
          link: "master/calendar_event",
          isselect: false,
          value: 1199
        },
        {
          link_name: "Class Master",
          link: "master/class",
          isselect: false,
          value: 111
        },
        {
          link_name: "Batch Year",
          link: "master/batch_year",
          isselect: false,
          value: 112
        },
        {
          link_name: "General Fees",
          link: "master/general_fees",
          isselect: false,
          value: 113
        },
        {
          link_name: "Special Fees",
          link: "master/special_fees",
          isselect: false,
          value: 114
        },
        {
          link_name: "Bus Fees",
          link: "master/bus_fees",
          isselect: false,
        },
        {
          link_name: "Special Bus Fees",
          link: "master/special_bus_fees",
          isselect: false,
          value: 115
        },
        {
          link_name: "Subject Master",
          link: "master/subject_master",
          isselect: false,
          value: 116
        },
        {
          link_name: "Subject Assign",
          link: "master/subject_assign",
          isselect: false,
          value: 117
        },
        {
          link_name: "Book Master",
          link: "master/library_book_master",
          isselect: false,
          value: 118
        },
        {
          link_name: "Uniform Master",
          link: "master/uniform_master",
          isselect: false,
          value: 119
        },
        {
          link_name: "Staff Type",
          link: "master/staff_type",
          isselect: false,
          value: 1191
        },
        {
          link_name: "Staff Category",
          link: "master/staff_category",
          isselect: false,
          value: 1192
        },
        {
          link_name: "Leave Master",
          link: "master/leave_master",
          isselect: false,
          value: 1193
        },
        {
          link_name: "Hostel Master",
          link: "master/hostel_master",
          isselect: false,
          value: 1194
        },
        {
          link_name: "Vehicle Master",
          link: "master/vehicle_master",
          isselect: false,
          value: 1195
        },
        {
          link_name: "Supplier Type",
          link: "master/supplier_master",
          isselect: false,
          value: 1196
        },
        // {
        //   link_name: "Role",
        //   link: "master/role",
        //isselect:false,
        //value:1197
        // },
        {
          link_name: "Reports",
          link: "master/reports",
          isselect: false,
          value: 1198
        }
      ]
    },

    // {
    //   link_name: "Library Master",
    //   link: null,
    //   icon: "schoolmaster",
    //   isselect: false,
    //   value: 12,
    //   sub_menu: [
    //     {
    //       link_name: "Book Mater",
    //       link: "library_master/book_master",
    //       isselect: false,
    //       value: 121
    //     }
    //   ]
    // },

    {
      link_name: "User",
      link: "user/user",
      icon: "customer",
      isselect: false,
      value: 13,
      sub_menu: []
    }
  ]



  showSubmenu(itemEl: HTMLElement) {

    itemEl.classList.toggle("showMenu");
  }

  showNestedSubmenu(item_sub: HTMLElement) {

    const nestedSubMenu = item_sub.querySelector('.nested-sub-menu');
    const isOpen = item_sub.classList.contains('showMenu');

    // Close all open nested submenus except the clicked one
    const openNestedSubmenus = document.querySelectorAll('.nested-sub-menu.showMenu');
    openNestedSubmenus.forEach((submenu) => {
      if (submenu !== nestedSubMenu) {
        submenu.classList.remove('showMenu');
        submenu.parentElement?.classList.remove('showMenu');
      }
    });

    // Toggle the clicked submenu
    if (nestedSubMenu) {
      if (!isOpen) {
        item_sub.classList.add('showMenu');
        nestedSubMenu.classList.add('showMenu');
      } else {
        item_sub.classList.remove('showMenu');
        nestedSubMenu.classList.remove('showMenu');
      }
    }
  }
}