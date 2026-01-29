const idValues={
    'Home':'#sidebar-home',
    'Favorites':'#sidebar-favorites',
    'Recent':'#sidebar-recents',
    'Snapshots':'#sidebar-snapshots',
    'Dashboards':'#sidebar-dashboards',
    'Reports':'#sidebar-reports',
    'Queries':'#sidebar-queries',
    'Alerts':'#sidebar-alerts',
    'Create New':'#sidebar-create-new',
    'Settings':'#sidebar-settings',
    'Help':'#sidebar-help',
    'About':'#sidebar-about',
    // 'Show Menu':'#sidebar-show-menu',
    // 'Hide Menu':'#sidebar-hide-menu'
  }
  export default (key) => {
    return idValues[key];
  }
 
  